package com.ele.crud.repo;

import com.ele.crud.model.ContactModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepo extends JpaRepository <ContactModel,Integer> {
}
