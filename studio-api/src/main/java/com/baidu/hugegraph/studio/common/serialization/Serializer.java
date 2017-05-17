package com.baidu.hugegraph.studio.common.serialization;


import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public interface Serializer<T> {
    String id();

    Class<T> serializesType();

    T deserialize(InputStream paramInputStream) throws IOException;

    void serialize(T paramT, OutputStream paramOutputStream) throws IOException;
}

