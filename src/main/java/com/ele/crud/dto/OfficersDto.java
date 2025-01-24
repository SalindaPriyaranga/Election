package com.ele.crud.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonSerialize
public class OfficersDto {

    private int ofId;
    private String ofName;
    private String ofPosition;
    private String ofNIC;
    private Date ofStartDate;
    private Date ofEndDate;
    private String ofReference ;
}
