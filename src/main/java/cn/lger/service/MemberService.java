package cn.lger.service;

import cn.lger.dao.MemberDao;
import cn.lger.domain.Constant;
import cn.lger.domain.Member2;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Code that Changed the World
 * Pro said
 * Created by Pro on 2017-12-06.
 */

@Service
public class MemberService {
    @Resource
    private MemberDao memberDao;

    public Member2 addMember(Member2 member){
        return memberDao.save(member);
    }

    public Member2 findMemberById(String id){
        return memberDao.findMemberById(id);
    }

    public Page<Member2> findMembers(Integer currentPage){
        if (currentPage == null){
            currentPage = 1;
        }
        Pageable pageable = new PageRequest(currentPage, Constant.PAGE_SIZE, Sort.Direction.ASC, "id");
        return memberDao.findAll(pageable);
    }

    public Page<Member2> findMembersByMemberName(Integer currentPage, String memberName){
        if (currentPage == null){
            currentPage = 1;
        }
        Pageable pageable = PageRequest.of(currentPage, Constant.PAGE_SIZE, Sort.Direction.ASC, "id");
        return memberDao.findAllByMemberName(memberName, pageable);
    }

    @Transactional
    public void modifyMemberState(String id, String state) {
        Member2 member = memberDao.findMemberById(id);
        if (member !=null){
            member.setState(state);
            memberDao.save(member);
            return;
        }
        throw new RuntimeException("Member中不存在当前的id:"+id);
    }

    public void deleteMember(String memberId){
        memberDao.deleteById(memberId);
    }

    @Transactional
    public void balanceRecharge(String id, String balance) {
        Member2 member = memberDao.findMemberById(id);
        if (member != null){
            member.setBalance(member.getBalance()+Float.valueOf(balance));
            memberDao.save(member);
            return;
        }
        throw new RuntimeException("Member中不存在当前的id:"+id);
    }

    @Transactional
    public Member2 integralLottery(Integer allIntegral) {
        int count = memberDao.queryAllCount();
        Random random = new Random();
        count = random.nextInt(count);
        Pageable pageable = PageRequest.of(count, 1);
        Page<Member2> page = memberDao.findAll(pageable);
        PageImpl page1 = (PageImpl) page;
        Member2 member = (Member2) page1.getContent().get(0);
        member.setMemberIntegral(allIntegral + member.getMemberIntegral());
        return memberDao.save(member);
    }

    public List<String> findBirthdayToday() {
        List<String> email = new ArrayList<String>();
//        List<Member> members = memberDao.findByBirthday(LocalDate.now());
        List<Member2> members = memberDao.findAll();
        int month = LocalDate.now().getMonthValue();
        int day = LocalDate.now().getDayOfMonth();
        for (Member2 m: members) {
            if (m.getLocalDate().getMonthValue() == month && m.getLocalDate().getDayOfMonth() == day)
                email.add(m.getEmail());
        }
        return email;
    }
}
