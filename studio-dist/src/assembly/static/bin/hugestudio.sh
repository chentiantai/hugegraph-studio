#!/bin/bash

# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# -----------------------------------------------------------------------------
# Start Script for the HugeStudio Server
# -----------------------------------------------------------------------------

# Environment Variable Prerequisites
#
#   Do not set the variables in this script. Instead put them into a script
#   studio-env.sh in STUDIO_HOME/bin to keep your customizations separate.
#
#   STUDIO_HOME     Base directory for HugeStudio.
#
#   STUDIO_PID      (Optional) Path of the file which should contains the pid
#                   of the HugeStudio startup java process, when start (fork) is
#                   used
#   JAVA_HOME       Must point at your Java Development Kit installation.
#                   Required to run the with the "debug" argument.
#
#   JRE_HOME        Must point at your Java Runtime installation.
#                   Defaults to JAVA_HOME if empty. If JRE_HOME and JAVA_HOME
#                   are both set, JRE_HOME is used.
#
#   JAVA_OPTS       (Optional) Java runtime options used when any command
#                   is executed.
#                   Include here and not in CATALINA_OPTS all options, that
#                   should be used by Tomcat and also by the stop process,
#                   the version command etc.
#                   Most options should go into CATALINA_OPTS.
#
#
#   JPDA_TRANSPORT  (Optional) JPDA transport used when the "jpda start"
#                   command is executed. The default is "dt_socket".
#
#   JPDA_ADDRESS    (Optional) Java runtime options used when the "jpda start"
#                   command is executed. The default is localhost:8000.
#
#   JPDA_SUSPEND    (Optional) Java runtime options used when the "jpda start"
#                   command is executed. Specifies whether JVM should suspend
#                   execution immediately after startup. Default is "n".
#
#   JPDA_OPTS       (Optional) Java runtime options used when the "jpda start"
#                   command is executed. If used, JPDA_TRANSPORT, JPDA_ADDRESS,
#                   and JPDA_SUSPEND are ignored. Thus, all required jpda
#                   options MUST be specified. The default is:
#
#                   -agentlib:jdwp=transport=$JPDA_TRANSPORT,
#                       address=$JPDA_ADDRESS,server=y,suspend=$JPDA_SUSPEND
#
#   JSSE_OPTS       (Optional) Java runtime options used to control the TLS
#                   implementation when JSSE is used. Default is:
#                   "-Djdk.tls.ephemeralDHKeySize=2048"
#
# -----------------------------------------------------------------------------

# resolve links - $0 may be a softlink
PRG="$0"

while [ -h "$PRG" ]; do
  ls=`ls -ld "$PRG"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG=`dirname "$PRG"`/"$link"
  fi
done

# Get standard environment variables
PRGDIR=`dirname "$PRG"`


# Only set STUDIO_HOME if not already set
if [ "x$STUDIO_HOME" = "x" ]; then
    STUDIO_HOME=`cd "$PRGDIR/.." >/dev/null; pwd`
fi



# Ensure that any user defined CLASSPATH variables are not used on startup,
# but allow them to be specified in studio-env.sh, in rare case when it is needed.
CLASSPATH=
if [ -f "${STUDIO_HOME}/bin/studio-env.sh" ]; then
  . "${STUDIO_HOME}/bin/studio-env.sh"
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
   STUDIO_CLASSPATH=${STUDIO_CLASSPATH}:${STUDIO_HOME}'/lib/*'
fi
# add conf to the classpath if the conf directory exists
# avoid to set /conf/*
if [ -d "$STUDIO_HOME"/conf ]; then
    STUDIO_CLASSPATH=${STUDIO_CLASSPATH}:${STUDIO_HOME}'/conf'
fi

export STUDIO_CLASSPATH=${STUDIO_CLASSPATH}:${CLASSPATH}

export JVM_OPTS="$JVM_OPTS -cp $STUDIO_CLASSPATH"
export JVM_OPTS="$JVM_OPTS -Xmx10g"

export MAIN_CLASS="com.baidu.hugegraph.studio.HugeStudio"

if [ "$1" = "-debug" ] ; then
  if [ -z "$JPDA_TRANSPORT" ]; then
    JPDA_TRANSPORT="dt_socket"
  fi
  if [ -z "$JPDA_ADDRESS" ]; then
    JPDA_ADDRESS="8414"
  fi
  if [ -z "$JPDA_SUSPEND" ]; then
    JPDA_SUSPEND="n"
  fi
  if [ -z "$JPDA_OPTS" ]; then
    JPDA_OPTS="-agentlib:jdwp=transport=$JPDA_TRANSPORT,address=$JPDA_ADDRESS,server=y,suspend=$JPDA_SUSPEND"
  fi
  JVM_OPTS="$JVM_OPTS $JPDA_OPTS"
  shift;
fi

# Uncomment to enable debugging
#JVM_OPTS="$JVM_OPTS -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=8414"

if [ "x$STUDIO_APP_NAME" = "x" ]; then
    STUDIO_APP_NAME="HugeStudioServer"
fi

# echo "$JAVA" $JVM_OPTS -Dapp.name="$STUDIO_APP_NAME" $MAIN_CLASS "$@"

exec "$JAVA" $JVM_OPTS -Dstudio.home="$STUDIO_HOME" -Dapp.name="$STUDIO_APP_NAME" $MAIN_CLASS "$@"




