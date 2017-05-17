package com.baidu.hugegraph.studio;

/**
 * Created by jishilei on 2017/5/17.
 */
public abstract interface ResourceMapper<T> {
    public abstract T mapJsonToObject(String jsonString);
}