package com.ele.crud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AccountModel {
    @Id
    private int acId;


    @ManyToOne
    @JoinColumn(name = "partyId")
    private PartyModel partyModel;

    private String acSecreSubName  ;
    private String acURL;
    private String acChecked1;
    private String acChecked2;
    private String acChecked3;
    private String acPosition1;
    private String acPosition2;
    private String acPosition3;
    private String acYear;
    private Date acCreateDate;
    private Date acUpdateDate;






}
