package com.charity.charitysupport.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationRequest {
    private String username;
    private Long postId;
    private BigDecimal amount;
    private String message;
    private Boolean isAnonymous;
    private String paymentMethod;
}
