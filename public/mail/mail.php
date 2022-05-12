<?

	header('Content-Type: text/html; charset=utf-8');

	require 'Exception.php';
	require 'PHPMailer.php';
	require 'SMTP.php';

	$subject = "[지오리서치 문의메일] ".$_POST['title']."";
	$message = 	"이름 : ".$_POST['name'].
				"<br>연락처 : ".$_POST['tel'].
				"<br>내용 : ".$_POST['context'];

	$mail = new \PHPMailer\PHPMailer\PHPMailer(true);

try {
//    $mail->SMTPDebug = 2;
    $mail->isSMTP(); 
    $mail->Host = 'smtp.worksmobile.com';
    $mail->SMTPAuth = true; 
    $mail->SMTPSecure = 'ssl'; 
    $mail->Username = 'info@goresearch.co.kr';// SMTP username
    $mail->Password = 'wldhfltjcl2016@@';// SMTP password
    $mail->Port = 465; 
	$mail->CharSet = 'utf-8';

    //Recipients
    $mail->setFrom('info@goresearch.co.kr', '지오리서치');
	$mail->addAddress('info@goresearch.co.kr', '지오리서치');


    //Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $message;
    $mail->send();
?>
   
<script>
	alert("문의메일이 전송되었습니다.");
	location.replace("/");
</script>

<?
} catch (Exception $e) {
?>
<script>
	alert("문의메일이 전송실패하였습니다.");
	location.replace("/");
</script>
<?
}
?>