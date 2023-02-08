package com.charity.charitysupport.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VolunteerStatistic {
    private Integer index;
    private String username;
    private String fullname;
    private String avatar;
    private String email;
    private Integer times;
    private Integer point;
    private String rank;
}
