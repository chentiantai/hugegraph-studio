package com.baidu.hugegraph.studio.common.serialization;

public interface SerializerRegistry {
    <T> Serializer<T> getSerializerForType(Class<T> paramClass);

    <T> Serializer<T> getSerializerByID(String paramString);

    <T> void registerReadWriteSerializer(Serializer<T> paramSerializer);

    <T> void registerReadOnlySerializer(Serializer<T> paramSerializer);
}

