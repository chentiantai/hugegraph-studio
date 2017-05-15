#!/bin/bash

export VARS=${@:1}

if [ "x$STUDIO_HOME" = "x" ]; then
    STUDIO_HOME=`dirname $0`/..
    STUDIO_HOME=`(cd "$BASEDIR"; pwd)`
fi

# Use JAVA_HOME if set, otherwise look for java in PATH
if [ -n "$JAVA_HOME" ]; then
    # Why we can't have nice things: Solaris combines x86 and x86_64
    # installations in the same tree, using an unconventional path for the
    # 64bit JVM.  Since we prefer 64bit, search the alternate path first,
    # (see https://issues.apache.org/jira/browse/CASSANDRA-4638).
    for java in "$JAVA_HOME"/bin/amd64/java "$JAVA_HOME"/bin/java; do
        if [ -x "$java" ]; then
            JAVA="$java"
            break
        fi
    done
else
    JAVA=java
fi

if [ -z $JAVA ] ; then
    echo Unable to find java executable. Check JAVA_HOME and PATH environment variables. > /dev/stderr
    exit 1;
fi

# Xmx needs to be set so that it is big enough to cache all the vertexes in the run
export JVM_OPTS="$JVM_OPTS -Xmx10g"

# add additional jars to the classpath if the lib directory exists
if [ -d "$STUDIO_HOME"/lib ]; then
  export STUDIO_CLASSPATH="$STUDIO_CLASSPATH:lib/*"
fi

if [ -d "$STUDIO_HOME"/conf ]; then
  export STUDIO_CLASSPATH="$STUDIO_CLASSPATH:conf/*"
fi

export JVM_OPTS="$JVM_OPTS -cp $STUDIO_CLASSPATH"
export JVM_OPTS="$JVM_OPTS -Xmx10g"

export MAIN_CLASS="com.baidu.hugegraph.studio.studio.Bootstrap"
# Uncomment to enable debugging
#JVM_OPTS="$JVM_OPTS -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=1414"

echo "$JAVA" $JVM_OPTS $MAIN_CLASS -Dapp.name="hugegraph-studio" $VARS

exec "$JAVA" $JVM_OPTS $MAIN_CLASS $VARS
