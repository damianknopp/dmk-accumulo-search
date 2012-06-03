import dmk.accumulo.AccumuloConnectorFactory
import dmk.accumulo.AccumuloIndexerService
import dmk.accumulo.AccumuloQueryService

import org.apache.commons.pool.impl.StackObjectPool

// Place your Spring DSL code here
beans = {
	def table = "invertedIndex"
	
	accumuloConnectorFactory(AccumuloConnectorFactory, 'instance': "dmk", 
		'zooKeepers': "127.0.0.1:2181", 'user': "root", 'pass': "pass".getBytes("utf-8")){	}
	
	stackObjectPool(StackObjectPool, accumuloConnectorFactory, 20, 10){	}
	
	accumuloIndexerService(AccumuloIndexerService){
		connectorPool = ref('stackObjectPool')
		table = "invertedIndex"
		numPartitions = 5
	}
	
	accumuloQueryService(AccumuloQueryService,  ref('stackObjectPool'), table){ }
}
