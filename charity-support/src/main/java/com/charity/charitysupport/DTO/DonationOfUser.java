package com.charity.charitysupport.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationOfUser {
    private Long postId;
    private String title;
    private byte[] img;
    private String organization;
    private BigDecimal amount;
}
