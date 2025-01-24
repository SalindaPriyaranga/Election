package com.ele.crud.repo;

import com.ele.crud.model.AnuuaMeetModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnuaMeetRepo extends JpaRepository<AnuuaMeetModel,Integer> {
}
