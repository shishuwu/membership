package cn.lger.dao;

import cn.lger.domain.Member2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

/**
 * Code that Changed the World
 * Pro said
 * Created by Pro on 2017-12-06.
 */
public interface MemberDao extends JpaRepository<Member2, String> {

    Member2 findMemberById(String id);

    Page<Member2> findAll(Pageable pageable);

    @Query("select m from Member2 m where m.memberName = ?1")
    Page<Member2> findAllByMemberName(String memberName, Pageable pageable);

    @Query("select count(m.id) from Member2 m")
    int queryAllCount();

    List<Member2> findByBirthday(LocalDate birthday);
}
