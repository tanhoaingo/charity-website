package com.charity.charitysupport.DTO;

import java.math.BigDecimal;

public interface IContributionStatistic {
    Object getCreateAt();
    BigDecimal getTotal();
    Long getTimes();
}
