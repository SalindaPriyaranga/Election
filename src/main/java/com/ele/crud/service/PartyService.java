package com.ele.crud.service;

import com.ele.crud.dto.UserDto;
import com.ele.crud.model.UserModel;
import org.modelmapper.TypeToken;
import com.ele.crud.dto.PartyDto;
import com.ele.crud.model.PartyModel;
import com.ele.crud.repo.PartyRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
public class PartyService{
    @Autowired
    private PartyRepo partyRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<PartyDto> getAllParty(){
         List<PartyModel> partyList = partyRepo.findAll();
        return modelMapper.map(partyList,new TypeToken<List<PartyDto>>(){}.getType());
    }
    public PartyDto saveparty(PartyDto partyDto) {

    partyRepo.save(modelMapper.map(partyDto, PartyModel.class));
        //System.out.println("saved user"+partyDto.getPartyId());
        return partyDto;
    }

}
