package com.ele.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ConstiModel {

    @Id
    private int conId;
    private Date conSubmitDate;
    private String submitBy;
    private String conChecked1;
    private String conChecked2;
    private String conChecked3;
    private String conPosition1;
    private String conPosition2;
    private String conPosition3;
    private Date acCreateDate;
    private Date acUpdateDate;
}
