class UrlMappings {

	static mappings = {
		//TODO: this puts a single term in the params.id vs param.terms, fix here
		"/document/search/$terms**?"(controller: "document", action: "search"){
			constraints {
				// apply constraints here
			}
		}

		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(view:"/index")
		"500"(view:'/error')
		
	}
}
