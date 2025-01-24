package com.ele.crud.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


public class MPartyDto {

    private int pId;
    private String pName;
    private String pSymbol ;
    private String pSecretaryName  ;
    private String pSymbolUrl   ;
    private String pFileNo;
    private String pAppRef;
    private Date pRegDate   ;
    private int pRegStatus;
    private Date pCreateDate ;
    private Date pUpdateDate ;
    private String pType;

    public int getpId() {
        return pId;
    }

    public void setpId(int pId) {
        this.pId = pId;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getpSymbol() {
        return pSymbol;
    }

    public void setpSymbol(String pSymbol) {
        this.pSymbol = pSymbol;
    }

    public String getpSecretaryName() {
        return pSecretaryName;
    }

    public void setpSecretaryName(String pSecretaryName) {
        this.pSecretaryName = pSecretaryName;
    }

    public String getpSymbolUrl() {
        return pSymbolUrl;
    }

    public void setpSymbolUrl(String pSymbolUrl) {
        this.pSymbolUrl = pSymbolUrl;
    }

    public String getpFileNo() {
        return pFileNo;
    }

    public void setpFileNo(String pFileNo) {
        this.pFileNo = pFileNo;
    }

    public String getpAppRef() {
        return pAppRef;
    }

    public void setpAppRef(String pAppRef) {
        this.pAppRef = pAppRef;
    }

    public Date getpRegDate() {
        return pRegDate;
    }

    public void setpRegDate(Date pRegDate) {
        this.pRegDate = pRegDate;
    }

    public int getpRegStatus() {
        return pRegStatus;
    }

    public void setpRegStatus(int pRegStatus) {
        this.pRegStatus = pRegStatus;
    }

    public Date getpCreateDate() {
        return pCreateDate;
    }

    public void setpCreateDate(Date pCreateDate) {
        this.pCreateDate = pCreateDate;
    }

    public Date getpUpdateDate() {
        return pUpdateDate;
    }

    public void setpUpdateDate(Date pUpdateDate) {
        this.pUpdateDate = pUpdateDate;
    }

    public String getpType() {
        return pType;
    }

    public void setpType(String pType) {
        this.pType = pType;
    }
}
