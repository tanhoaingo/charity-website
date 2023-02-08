package com.charity.charitysupport.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HomeData {
    private Integer posts;
    private Long supporters;
    private BigDecimal amount;
}
