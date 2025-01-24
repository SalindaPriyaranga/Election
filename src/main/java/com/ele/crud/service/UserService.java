package com.ele.crud.service;

import com.ele.crud.dto.UserDto;
import com.ele.crud.model.UserModel;
import com.ele.crud.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;




    public List<UserDto> getAllUsers() {
        List<UserModel> userList = userRepo.findAll();
        return modelMapper.map(userList,new TypeToken<List<UserDto>>(){}.getType());
    }

    public UserDto saveUser(UserDto userDto) {

        userRepo.save(modelMapper.map(userDto, UserModel.class));
        //System.out.println("saved user"+userDto.getId());
        return userDto;
    }

    public UserDto updateUser(UserDto userDto) {
        userRepo.save(modelMapper.map(userDto, UserModel.class));
        return userDto;
    }
    public String deleteUser(UserDto userDto) {
    userRepo.delete(modelMapper.map(userDto, UserModel.class));
    return "User deleted";
   }
}
