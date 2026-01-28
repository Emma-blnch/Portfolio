<?php

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

$to = "emma.blnch4@gmail.com";
$from = "no-reply@emma-blnch.fr"; // adresse du domaine (créée sur LWS)
$siteName = "Portfolio Emma Blanchard";
$subject = "Nouveau message depuis le portfolio";

// refuse si GET
if (($_SERVER["REQUEST_METHOD"] ?? '') !== "POST") {
  http_response_code(405);
  echo json_encode(["ok" => false, "error" => "Méthode non autorisée"]);
  exit;
}

// (Optionnel mais utile) bloquer les POST cross-site basiques
$allowedHosts = [
  'emma-blnch.fr',
  'www.emma-blnch.fr',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin) {
  $o = parse_url($origin);
  $originHost = $o['host'] ?? '';
  if ($originHost && !in_array($originHost, $allowedHosts, true)) {
    http_response_code(403);
    echo json_encode(["ok"=>false,"error"=>"Origine refusée"]);
    exit;
  }
}

// === Rate limit simple par IP (fichier) ===
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$dir = __DIR__ . '/.ratelimit';
if (!is_dir($dir)) { @mkdir($dir, 0755, true); }

// cleanup (1 fois de temps en temps) : supprime les fichiers vieux
$ttl = 24 * 3600; // 24h
foreach (glob($dir . '/*.txt') as $f) {
  if (is_file($f) && (time() - filemtime($f)) > $ttl) {
    @unlink($f);
  }
}

$key = preg_replace('/[^a-zA-Z0-9_.-]/', '_', $ip);
$file = $dir . '/' . $key . '.txt';

$now = time();
$window = 60;     // fenêtre 60s
$max = 5;         // max 5 envois / minute

$data = ['t' => $now, 'c' => 0];

if (file_exists($file)) {
  $raw = @file_get_contents($file);
  $json = json_decode($raw, true);
  if (is_array($json)) $data = $json;
}

// reset si fenêtre dépassée
if (($now - ($data['t'] ?? 0)) > $window) {
  $data = ['t' => $now, 'c' => 0];
}

$data['c'] = ($data['c'] ?? 0) + 1;

if ($data['c'] > $max) {
  http_response_code(429);
  echo json_encode(["ok" => false, "error" => "Trop de messages. Réessayez dans une minute."]);
  exit;
}

@file_put_contents($file, json_encode($data), LOCK_EX);

$ts = (int)($_POST['ts'] ?? 0);
if (!$ts) {
  http_response_code(400);
  echo json_encode(["ok"=>false,"error"=>"Requête invalide."]);
  exit;
}
$age = time() - $ts;
if ($age < 3 || $age > 7200) {
  http_response_code(400);
  echo json_encode(["ok"=>false,"error"=>"Requête invalide."]);
  exit;
}

// Honeypot anti-bot
if (!empty($_POST['website'] ?? '')) {
  echo json_encode(["ok" => true]);
  exit;
}

// Limites anti-spam (simple)
$nameRaw = trim((string)($_POST["name"] ?? ''));
$emailRaw = trim((string)($_POST["email"] ?? ''));
$messageRaw = trim((string)($_POST["message"] ?? ''));

if (!$nameRaw || !$emailRaw || !$messageRaw) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Champs requis manquants"]);
  exit;
}

// Anti header injection (parano safe)
if (preg_match("/[\r\n]/", $emailRaw)) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Email invalide"]);
  exit;
}

$email = filter_var($emailRaw, FILTER_VALIDATE_EMAIL);
if (!$email) {
  http_response_code(400);
  echo json_encode(["ok" => false, "error" => "Email invalide"]);
  exit;
}

// Nettoyage + limites
$name = strip_tags($nameRaw);
$message = strip_tags($messageRaw);

// Limites de taille (évite spam/payload)
if (mb_strlen($name) > 80) $name = mb_substr($name, 0, 80);
if (mb_strlen($message) > 4000) $message = mb_substr($message, 0, 4000);

$body = "Nom : {$name}\nEmail : {$email}\n\nMessage :\n{$message}\n";

// From sur ton domaine + Reply-To vers le visiteur
$from = "no-reply@emma-blnch.fr";
$headers = [];
$headers[] = "From: Singula <{$from}>";
$headers[] = "Reply-To: {$email}";
$headers[] = "Content-Type: text/plain; charset=UTF-8";
$headersStr = implode("\r\n", $headers);

// Envelope sender (important chez beaucoup d'hébergeurs)
$ok = @mail($to, $subject, $body, $headersStr, "-f {$from}");

if ($ok) {
  echo json_encode(["ok" => true]);
} else {
  http_response_code(500);
  echo json_encode(["ok" => false, "error" => "Erreur serveur (mail)"]);
}

exit;