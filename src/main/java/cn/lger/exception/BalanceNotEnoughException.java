package cn.lger.exception;

/**
 * Code that Changed the World
 * Pro said
 * Created by Pro on 2017-12-17.
 */
public class BalanceNotEnoughException extends RuntimeException{
	private static final long serialVersionUID = -8127743927307205761L;

	public BalanceNotEnoughException(){
        super("余额不足");
    }

}
