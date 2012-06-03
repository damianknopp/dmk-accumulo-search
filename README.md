dmk-accumulo-search
===================

Webapp and cloud text search. Tinkering with require.js, backbone.js, and accumulo.

This webapp needs Hadoop, Zookeeper, and Accumulo installed.  Also you will need to find https://github.com/damianknopp/dmk-accumulo-indexer in a maven repo.

To run, try
	grails test run-app
then browse to the uri `http://localhost:8080/{contextRoot}



Trouble shooting
======================

Some times running  ${CLOUD_HOME}/bin/init-cloud.sh will work to reinit the system, other times I was getting the "0 node replication" error messgae. (see http://wiki.apache.org/hadoop/CouldOnlyBeReplicatedTo)
In particular my system said the DFS was at 100% on the dfs status page (http://localhost:50070/dfshealth.jsp).  However, my disk was not full, I'm not sure why it reported this.  At any rate to fix, I did the following steps

Remove the tmp dir.
	rm -rf ${CLOUD_HOME}/tmp/
Remove the datanode dir. Defined in hdfs-site.xml
	rm -rf ${CLOUD_HOME}/hdfs/data/
Remove the namenode dir. Defined in the hdfs-site.xml
	rm -rf ${CLOUD_HOME}/hdfs/name
Reformat the namenode
	hadoop namenode -format
Start the cloud processes
	${CLOUD_HOME}/bin/start-cloud.sh 
This step probably isn't necessary, but I visited the dfs page. http://localhost:50070/dfshealth.jsp
I manually tested hdfs, again this step wasn't necessary, just gives quicker feedback
List the file system
	hadoop fs -ls /
Write to the filesystem
	hadoop fs -put tmp.txt  /.
Verify the write
	hadoop fs -ls /

Initialize accumulo
	${CLOUD_HOME}/accumulo/bin/accumulo init
Start accumulo
	${ACCUMULO_HOME}/bin/start-all.sh 
Verify the processeses are running
	jps
Verify accumulo is running by visiting the accumulo shell
	acshell

Create tables and index data, https://github.com/damianknopp/dmk-accumulo-indexer
	cd ${WORKSPACE}/dmk-accumulo-indexer
	mvn assembly:single
	./runIndexer.sh test.txt
	./runIndexer.sh test2.txt
Verify in accumulo shell
	acsehll
	tables (verify invertedIndex exists)
	scan -t invertedIndex

Finally bring up te grails webapp
	grails test run-app
Visit the page listed,
	http://localhost:8080/accumulo-test/main/index
