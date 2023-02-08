package com.charity.charitysupport.DTO;

import java.math.BigDecimal;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationDto {
    private String username;
    private String fullname;
    private String avatar;
    private BigDecimal amount;
    private String paymentMethod;
    private Date createAt;
    private String titlePost;
    private Boolean isAnonymous;
}
