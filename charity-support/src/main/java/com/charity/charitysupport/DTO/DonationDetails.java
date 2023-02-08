package com.charity.charitysupport.DTO;

import java.math.BigDecimal;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor 
public class DonationDetails {
    private String fullname;
    private BigDecimal amount;
    private Date createAt;
    private String avatar;
    private Boolean isAnonymous;
}
