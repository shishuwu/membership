package cn.lger.exception;

/**
 * Code that Changed the World
 * Pro said
 * Created by Pro on 2017-12-17.
 */
public class GiftNumberNotEnoughException extends RuntimeException{
    private static final long serialVersionUID = -6384071185936156054L;

    public GiftNumberNotEnoughException() {
        super("礼品数量不足");
    }

}
