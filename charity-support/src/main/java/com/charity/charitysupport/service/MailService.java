package com.charity.charitysupport.service;

import com.charity.charitysupport.DTO.NotificationMail;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MailService {
    
    private final JavaMailSender javaMailSender;
    private final MailContentBuilder mailContentBuilder;

    @Async
    public void sendMail(NotificationMail notificationMail){
        MimeMessagePreparator mimeMessagePreparator = mimeMessage -> {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

            mimeMessageHelper.setFrom("charitysupport@gmail.com");
            mimeMessageHelper.setSubject(notificationMail.getSubject());
            mimeMessageHelper.setTo(notificationMail.getRecipient());
            mimeMessageHelper.setText(mailContentBuilder.build(notificationMail.getBody()));
        };

        try {
            javaMailSender.send(mimeMessagePreparator);
        } catch (Exception e) {
            throw new RuntimeException("Exception occured when sending mail to " + notificationMail.getRecipient(), e);
        }
    }
}
