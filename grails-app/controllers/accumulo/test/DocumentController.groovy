package accumulo.test

import java.util.Date
import grails.converters.JSON

class DocumentController {
	static layout = ""
	
	def accumuloQueryService
	
	def beforeInterceptor = {
		println "Tracing action ${actionUri}"
	}
	
	def index() { }
	
	def search() {
		log.debug "$params"
		def terms = []
		if(params?.id){
			terms = [ params?.id ]
		}else if(params?.terms.indexOf("/") > 0){
			terms = Arrays.asList(params?.terms.split("/"))
		}else{
			//TODO: send back err msg
		}
		log.debug "searching on terms $terms ${terms.getClass()}"
		def results = accumuloQueryService.queryTerms(terms.toArray(new String[0]))
		results = results ?: [];
		log.debug "service found ${results.size()} results";
		log.debug("$results");
//		def json = new JSON(results)
//		json.setPrettyPrint(true)
//		render json.toString()
		int count = 1 ;
		//tricky json builder!
		//http://java.dzone.com/articles/groovy-180-%E2%80%93-meet-jsonbuilder
		def listOfMaps = results.collect{
				log.debug("building result ${count++}")
				[ 	
					dtg: "${it?.dtg}",
					uri: "${it?.uri}"
				]	
			}
		def summaries = []
		summaries.addAll(listOfMaps)
//		log.debug(listOfMaps)
//		def root = new groovy.json.JsonBuilder(listOfMaps).toString()
//		root = '''\"summaries\":${root}"'''
//		def str = new StringBuilder(1024)
//		str << '"summaries": {['
//		results.each{
//			str << '"doc":{'
//			str << '"dtg:' << '"' << it?.dtg << '",'
//			str << '"uri:' << '"' << it?.uri << '"'
//			str << '''},'''
//		}
//		str << ''']}'''
//		render(contentType: 'text/json'){
//			summaries{
//				results.each{
//					doc(dtg: "${it?.dtg}",
//					uri: "${it?.uri}")
//				}
//			}
//		}
//		render str.toString()
		render summaries as JSON
	}
	
	/**
	 * simple stub data
	 * @return
	 */
	def makeSummaries(){
		def summaries = []
		summaries << makeSummary(new Date(), "report1", "title 1", "synopsis unk", "contents unk")
		summaries << makeSummary(new Date(), "report2", "title 2", "synopsis unk", "contents unk")
		summaries << makeSummary(new Date(), "report3", "title 3", "synopsis unk", "contents unk")
		summaries << makeSummary(new Date(), "report4", "title 4", "synopsis unk", "contents unk")
		summaries << makeSummary(new Date(), "report5", "title 5", "synopsis unk", "contents unk")
	}
	
	/**
	 * stub data
	 * @param dtg
	 * @param name
	 * @param title
	 * @param summary
	 * @param contents
	 * @return
	 */
	def makeSummary(dtg, name, title, summary, contents){
		def map = [:]
		map.dtg = dtg
		map.name = name
		map.title = title
		map.summary = summary
		map.contents = contents
		return map
	}
}
