// Values from your OAuth app. You create ONE for a page/plugin/service.
$clientid     = "wK1pK77pMo";
$clientsecret = "secret";

// The official CleverReach URL, no need to change this.
$token_url = "https://rest.cleverreach.com/oauth/token.php";

// We use curl to make the request
$curl = curl_init();
curl_setopt($curl,CURLOPT_URL, $token_url);
curl_setopt($curl,CURLOPT_USERPWD, $clientid . ":" . $clientsecret);
curl_setopt($curl,CURLOPT_POSTFIELDS, array("grant_type" => "client_credentials"));
curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($curl);
curl_close ($curl);

// The final $result contains the access_token and some other information besides.
// For you to see it, we dump it out here.
var_dump($result);
