package com.ele.crud.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class OfficersModel {
    @Id
    private int ofId;
    private String ofName;
    private String ofPosition;
    private String ofNIC;
    private Date ofStartDate;
    private Date ofEndDate;
    private String ofReference ;
    private Date ofCreateDate;
    private Date ofUpdateDate;
//    @ManyToOne
//    @JoinColumn(name = "pId", nullable = false)
//    private MPartyModel mPartyModel;

}
