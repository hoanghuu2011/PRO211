package fpt.mailinhapp.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;



@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendPasswordResetEmail(String toEmail, String newPassword) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject("Thông báo: Mật khẩu mới của bạn đã được đặt lại");

        String emailContent = "<p>Chào quý khách,</p>"
                + "<p>Malinhtour xin thông báo rằng mật khẩu của quý khách đã được đặt lại thành công.</p>"
                + "<p>Dưới đây là mật khẩu mới của quý khách:</p>"
                + "<p >Mật khẩu mới: <span style='color:red; font-weight:bold;'>" + newPassword + "</span></p>"
                + "<p>Quý khách vui lòng không chia sẻ mật khẩu này với người khác. Nếu quý khách không thực hiện yêu cầu này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>"
                + "<p>Trân trọng,<br>"
                + "Malinhtour</p>";

        helper.setText(emailContent, true);
        javaMailSender.send(message);
    }

    public void sendEmail(String toEmail, String subject, String text) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(text, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();

            throw new RuntimeException("Failed to send email", e);
        }
    }
}
