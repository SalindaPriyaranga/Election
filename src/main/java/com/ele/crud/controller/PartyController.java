package com.ele.crud.controller;

import com.ele.crud.dto.PartyDto;
import com.ele.crud.dto.UserDto;
import com.ele.crud.service.PartyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value= "/api/v1/")
public class PartyController {

    @Autowired
    private PartyService partyService;

    @GetMapping("/getallparty")
    public List<PartyDto> getPartyList(){

        return partyService.getAllParty();

    }
    @PostMapping("/addparty")
    public PartyDto saveParty(@RequestBody PartyDto partyDto) {
        return partyService.saveparty(partyDto);
    }
}
