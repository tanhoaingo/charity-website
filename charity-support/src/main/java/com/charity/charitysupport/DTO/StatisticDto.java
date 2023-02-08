package com.charity.charitysupport.DTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatisticDto {
    private BigDecimal sumOfAmount;
    private Long numberOfSupporter;
    private Long numberOfVolunteer;
    private List<SupporterDto> supporters;  
    private List<IContributionStatistic> contributionStatistics;
    private List<Organization> organizations;
}
