package cn.lger.exception;

/**
 * Code that Changed the World
 * Pro said
 * Created by Pro on 2017-12-17.
 */
public class IntegralNotEnoughException extends RuntimeException{

    private static final long serialVersionUID = 1637143580895761575L;

    public IntegralNotEnoughException() {
        super("账户积分不足");
    }

}
