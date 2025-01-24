package com.ele.crud.controller;


import com.ele.crud.dto.UserDto;
import com.ele.crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value= "api/v1/")

public class UserController {

    @Autowired
    private  UserService userService;


    @GetMapping("/getuser")
    public List<UserDto> getUser() {
        return userService.getAllUsers();
    }

    @PostMapping("/adduser")
    public UserDto saveUser(@RequestBody UserDto userDto) {
        return userService.saveUser(userDto);
    }

    @PutMapping("/updateuser")
    public UserDto updateUser(@RequestBody UserDto userDto) {
        return userService.updateUser(userDto);
    }
    @DeleteMapping("/deleteuser")
    public String deleteUser(@RequestBody UserDto userDto) {
        return userService.deleteUser(userDto);
    }

}
