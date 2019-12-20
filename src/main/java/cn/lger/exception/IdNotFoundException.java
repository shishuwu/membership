package cn.lger.exception;

/**
 * Code that Changed the World
 * Pro said
 * Created by Pro on 2017-12-17.
 */
public class IdNotFoundException extends RuntimeException{

    private static final long serialVersionUID = -8240726201427974843L;

    public IdNotFoundException() {
        super("id找不到");
    }
}
