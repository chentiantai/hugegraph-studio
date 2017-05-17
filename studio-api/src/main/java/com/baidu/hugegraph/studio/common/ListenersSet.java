package com.baidu.hugegraph.studio.common;


import java.util.Collections;
import java.util.HashMap;
import java.util.Objects;
import java.util.Set;
import java.util.function.Consumer;

public class ListenersSet<L>
{
    private volatile Set<L> listeners = Collections.newSetFromMap(new HashMap());

    public void add(L listener)
    {
        Objects.requireNonNull(listener);
        if (this.listeners.contains(listener)) {
            return;
        }
        synchronized (this)
        {
            if (this.listeners.contains(listener)) {
                return;
            }
            Set<L> newListeners = Collections.newSetFromMap(new HashMap());
            newListeners.addAll(this.listeners);
            newListeners.add(listener);
            this.listeners = newListeners;
        }
    }

    public void remove(L listener)
    {
        Objects.requireNonNull(listener);
        if (!this.listeners.contains(listener)) {
            return;
        }
        synchronized (this)
        {
            if (!this.listeners.contains(listener)) {
                return;
            }
            Set<L> newListeners = Collections.newSetFromMap(new HashMap());
            newListeners.addAll(this.listeners);
            newListeners.remove(listener);
            this.listeners = newListeners;
        }
    }

    public void clear()
    {
        this.listeners.clear();
    }

    public void forEach(Consumer<? super L> consumer)
    {
        this.listeners.parallelStream().forEach(consumer);
    }

    public String toString()
    {
        return this.listeners.toString();
    }
}
