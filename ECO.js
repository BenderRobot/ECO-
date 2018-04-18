// ==UserScript==
// @name        eco_auto
// @namespace   Bender
// @version     4.6
// @grant       none
// ==/UserScript==


var url_nav = "http://izar.agora.msanet:8241/secure";
var url_eco = "http://izar.agora.msanet:8241/browse";
var url_clo = "http://izar.agora.msanet:8241/secure/views/bulkedit";
var url_user_eco = "http://izar.agora.msanet:8241/secure/IssueNavigator.jspa?pager"
var full_url = document.location.href;
var path_url = full_url.substring( 0 ,full_url.lastIndexOf( "/" ) );
var file_name = full_url.substring(full_url.lastIndexOf( "/" )+1);
var balize = full_url.substring(full_url.lastIndexOf( "/" )+1, full_url.lastIndexOf( "/" )+4);
var user_eco = full_url.substring(full_url.length-17, full_url.length-10);
var user_eco_bis = full_url.substring(full_url.lastIndexOf( "/" )+1, full_url.lastIndexOf( "/" )+6);
var g_title = document.title;
var balize_g_title = g_title.substring(0, 3)
var arr_service = ["AUTRES",
									 "N1-UO-GP", 
									 "N1-UO-SB", 
									 "N1-UO-SE", 
									 "SEP-EXPLOIT", 
									 "POP",
									 "AGL-SUPPORT", 
									 "AGL-PW",
									 "AGL-ENTREP",
									 "AGL-REF-DIF", 
									 "socletechnique-support", 
									 "Middleware-Support", 
									 "assist-BDD", 
									 "eNet", 
									 "Syst-Int", 
									 "EOLE",
									 "Maladie"];
var tab_month = ["janv.",
								 "févr.", 
								 "mars", 
								 "avr.", 
								 "mai", 
								 "juin", 
								 "juil.", 
								 "août", 
								 "sept.", 
								 "oct.", 
								 "nov.", 
								 "déc."];


// MAIN
if (path_url == url_nav || path_url == url_eco) {
	check_cookie("user_name");
	make_btn("incid_mat");
	make_btn("incid_eon");
	make_btn("suivi_fon_i");
	make_btn("suivi_fon_d");
	make_btn("incid_maj");
	make_btn("sauv_nok");
	make_btn("incid_waarp");
	make_btn("trans_sgfe");
	check_login();
} if (path_url == url_eco && get_cookie("tag") == "sf_d" || path_url == url_eco && get_cookie("tag") == "sf_i") {
	set_cookie("tag", "", 365);
	alert("!! ajouter observateur !!");
} if (path_url == url_nav && balize == "Man") {
	document.getElementById("userNames").value = "c82dpaexp, c82dpasd, c82dpaim,";
} if (path_url == url_nav && balize == "Edi") {
	make_btn("maj");
} if (path_url == url_clo) {
	make_btn("check_del");
	make_btn("old_eco");
	make_btn("all_eco");
} if (path_url == url_nav && balize == "Iss" && user_eco != get_cookie("user_name") && user_eco_bis != "start") {
	//check_cookie("ECO");
	reload(10000);
	new_eco();
	make_btn("new");
} if (path_url == url_nav && balize == "Com" && balize_g_title == "Aff") {
	auto_assign();
} if (path_url == url_eco && check_by_id("action_id_91") == null) {
	if (check_by_id("action_id_11") != null && check_by_id("stqcform") == null) {
		auto_affect();
	} if (check_by_id("action_id_61") != null && check_by_id("stqcform") == null) {
		set_cookie("service", "", 365);
		//check_service_abort();
		for (var i = 0; i < arr_service.length; i++) {
			set_cookie("service", "AUTRES", 365);
			make_btn(arr_service[i]);
		}
		make_btn("SEP-SUPPORT");
	} if (check_by_id("action_id_61") != null && check_by_id("stqcform") != null) {
		attribut();
	}
} if (path_url == url_nav && balize == "Com"  && balize_g_title == "Att") {
	att_service();
} if (path_url == url_nav && balize == "Cre" && check_by_id("customfield_10060:1") == null) {
	if (get_cookie("type") == "incident") {
		crea_type("i");
	} if (get_cookie("type") == "demande") {
		crea_type("d");
	}
} if (path_url == url_nav && balize == "Cre" && check_by_id("customfield_10060:1") != null) {
	make_btn("creat_dem");
	if (get_cookie("tag") == "trans_sgfe") {
		transfert_sgfe();
	} if (get_cookie("tag") == "incid_waarp") {
		incident_waarp();
	} if (get_cookie("tag") == "sauv_nok") {
		sauvegarde_nok();
	} if (get_cookie("tag") == "incidentMatin") {
		incident_matin();
	} if (get_cookie("tag") == "incidentEon") {
		incident_eon();
	} if (get_cookie("tag") == "incidentMaj") {
		incident_maj();
	} if (get_cookie("tag") == "sf_i") {
		suivi_fonctionnel_incident();
	} if (get_cookie("tag") == "sf_d") {
		suivi_fonctionnel_demande();
	}
}

// FUNCTION
function check_login() {
	check_by_id()
}

function transfert_sgfe() {
	document.getElementById("customfield_10060:1").value = 581364;
	document.getElementById("customfield_10060:2").value = 581368;
	document.getElementById("summary").value = "##transfertSGFEY20# Ctrl Transfert SGFE du produit Y20  ";
	document.getElementById("description").value = "Bonjour,\n\nMerci de prendre en compte l'incident suivant:\n\n\n\nvoici la log:\n\n{noformat}\n\n{noformat}\n\nCordialement,\nSUPPORT-N1";
	document.getElementById("customfield_10001").value = "SEP";
	document.getElementById("priority").value = "3";
	document.getElementById("customfield_10723").value = resolv_date();
}

function sauvegarde_nok() {
	document.getElementById("customfield_10060:1").value = 581364;
	document.getElementById("customfield_10060:2").value = 581369;
	document.getElementById("summary").value = "#incidentSauvegarde# ";
	document.getElementById("description").value = "Bonjour,\n\nMerci de prendre en compte l'incident suivant:\n\n\n\nvoici la log:\n\n{noformat}\n\n{noformat}\n\nCordialement,\nSUPPORT-N1";
	document.getElementById("customfield_10001").value = "SEP";
	document.getElementById("priority").value = "3";
	document.getElementById("customfield_10723").value = resolv_date();
}

function incident_maj() {
	document.getElementById("customfield_10060:1").value = 581364;
	document.getElementById("customfield_10060:2").value = 581368;
	document.getElementById("summary").value = "#incidentMajProduit# ";
	document.getElementById("description").value = "Bonjour,\n\nMerci de prendre en compte l'incident suivant:\n\n\n\nvoici la log:\n\n{noformat}\n\n{noformat}\n\nCordialement,\nSUPPORT-N1";
	document.getElementById("customfield_10001").value = "SEP";
	document.getElementById("priority").value = "1";
	document.getElementById("customfield_10723").value = resolv_date();
}

function suivi_fonctionnel_demande() {
	document.getElementById("customfield_10060:1").value = 581853;
	document.getElementById("customfield_10060:2").value = 581878;
	document.getElementById("summary").value = "#suivifonctionnel# ";
	document.getElementById("description").value = "Bonjour,\n\nHeure : \n\n\n\nCordialement,\nSUPPORT-N1";
	document.getElementById("customfield_10001").value = "SEP";
	document.getElementById("priority").value = "1";
	document.getElementById("customfield_10723").value = resolv_date();
}

function suivi_fonctionnel_incident() {
	document.getElementById("customfield_10060:1").value = 581364;
	document.getElementById("customfield_10060:2").value = 581375;
	document.getElementById("summary").value = "#suivifonctionnel# ";
	document.getElementById("description").value = "Bonjour,\n\nHeure : \n\n\n\nCordialement,\nSUPPORT-N1";
	document.getElementById("customfield_10001").value = "SEP";
	document.getElementById("priority").value = "1";
	document.getElementById("customfield_10723").value = resolv_date();
}

function incident_eon() {
	document.getElementById("customfield_10060:1").value = 581364;
	document.getElementById("customfield_10060:2").value = 581380;
	document.getElementById("summary").value = "#IncidentEON# - STATUT CRITICAL -  - ";
	document.getElementById("description").value = "Bonjour,\n\nMerci de prendre en compte.\n\n*SERVEUR :* \n\n*SERVICE :*  \n\n*CURRENT STATUS :* \n\n*STATUT INFORMATION :* \n\nCordialement,\nSUPPORT-N1";
	document.getElementById("customfield_10001").value = "SEP";
	document.getElementById("priority").value = "1";
	document.getElementById("customfield_10723").value = resolv_date();
}

function incident_matin() {
	document.getElementById("customfield_10060:1").value = 581364;
	document.getElementById("customfield_10060:2").value = 581382;
	document.getElementById("summary").value = "#IncidentMatin# ";
	document.getElementById("customfield_10001").value = "SEP";
	document.getElementById("priority").value = "1";
	document.getElementById("customfield_10723").value = resolv_date();
}

function incident_waarp() {
	document.getElementById("customfield_10060:1").value = 581364;
	document.getElementById("customfield_10060:2").value = 581373;
	document.getElementById("summary").value = "#IncidentWAARP#  ";
	document.getElementById("description").value = "Bonjour,\n\nLe transfert de test est en erreur, merci d'analyser cet incident.\n\n\n\Cordialement,\nSUPPORT-N1";
	document.getElementById("customfield_10001").value = "SEP";
	document.getElementById("priority").value = "3";
	document.getElementById("customfield_10723").value = resolv_date();
}

function resolv_date() {
	var d = new Date();
	if (d.getDay() >= 4) {
		d.setTime(d.getTime() + (3 * 24 * 60 * 60 * 1000));
	} else {
		d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
	}
	d = d.getDate() + "/" + tab_month[parseInt(d.getMonth())] + "/" + d.getFullYear() + " 01:00 AM";
	return d;
}

function verif_date(cell) {
	var d = new Date();
	d.setTime(d.getTime() - (22 * 24 * 60 * 60 * 1000));
	//d =  d.getMonth()+ "/" + d.getDate() + "/" + d.getFullYear();
	var idx = cell.indexOf("/");
	var idx1 = cell.indexOf("/", idx+1);
	var day = cell.substring(idx-2, idx);
	var month = cell.substring(idx+1, idx1);
	month = tab_month.indexOf(month)+1;
	var year = cell.substring(idx1+1, idx1+3);
	year = parseInt(year) + 2000;
	var eco_date = new Date(month+ "/" +day+ "/" +year);
	//alert(d + " - "+ eco_date);
	if (d > eco_date) {
		//alert("old");
		return "old";
	} if (d < eco_date) {
		//alert("new");
		return "new";
	}
}

function check_service_abort() {
	var cell_title = document.getElementById("issue_header").innerHTML;
	var idx = cell_title.indexOf("A l'intention du métier ");
	if (idx != -1) {
		var cell_service = document.getElementById("tab1").rows[0].cells[1].innerHTML;
		var idx1 = cell_service.indexOf("- ");
		var idx2 = cell_service.indexOf("- ", idx1+1);
		var service = cell_service.substring(idx1+2, idx2-2);
		make_btn(service, "t");
	}
}

function crea_type(type) {
	var i;
	set_cookie("type", "", 365);
	if (type == "i") { i = 45 }
	if (type == "d") { i = 46 }
	document.getElementById("issuetype").value = parseInt(i);
	click_by_id("Suivant>>");
}

function att_service() {
	var c_service = get_cookie("service");
	if (c_service != "AUTRES") {
		set_cookie("service", "AUTRES", 365);
		document.getElementById("customfield_10670").value = c_service;
		click_by_id("Attribuer à un groupe");
	}
}

function attribut() {
	var cell_subtask = document.getElementById("issuetable").rows[0].cells[6].innerHTML;
	var id_affect_subtask = cell_subtask.trim();
	id_affect_subtask = id_affect_subtask.substring(436, 456);
	click_by_id(id_affect_subtask);
}

function check_by_id(id) {
	return document.getElementById(id);
}

function auto_affect() {
	var cell_tab1 = document.getElementById("tab1").rows[0].cells[1].innerHTML;
	var service = cell_tab1.trim();
	service = service.substring(0,5)
	if (service == "INCID" || service == "DEMAN") {
		affected();
	} else {
		alert("Support");
	}
}

function make_btn(btn_name, test="") {
	var btn = document.createElement("BUTTON");
	var final_btn_name;
	if (btn_name == "new") {
		var number = new_eco();
		final_btn_name = "OPEN "+number.length+" NEW ECO";
		btn.onclick = function() {
			var n_e = new_eco();
			if (n_e.length > 0) {
				open_eco(n_e);
			}
		};
	} if (btn_name == "incid_waarp") {
		final_btn_name = "#IncidentWAARP#";
		btn.onclick = function() {
				make_i();
				set_cookie("type", "incident", 365);
				set_cookie("tag", "incid_waarp", 365);
		};
	} if (btn_name == "trans_sgfe") {
		final_btn_name = "#transfertSGFEY20#";
		btn.onclick = function() {
				make_i();
				set_cookie("type", "incident", 365);
				set_cookie("tag", "trans_sgfe", 365);
		};
	} if (btn_name == "sauv_nok") {
		final_btn_name = "#incidentSauvegarde#";
		btn.onclick = function() {
				make_i();
				set_cookie("type", "incident", 365);
				set_cookie("tag", "sauv_nok", 365);
		};
	} if (btn_name == "incid_mat") {
		final_btn_name = "#incidentMatin#";
		btn.accessKey = "i";
		btn.onclick = function() {
				make_i();
				set_cookie("type", "incident", 365);
				set_cookie("tag", "incidentMatin", 365);
		};
	} if (btn_name == "incid_eon") {
		final_btn_name = "#incidentEON#";
		btn.onclick = function() {
				make_i();
				set_cookie("type", "incident", 365);
				set_cookie("tag", "incidentEon", 365);
		};
	}if (btn_name == "incid_maj") {
		final_btn_name = "#incidentMajProduit#";
		btn.onclick = function() {
				make_i();
				set_cookie("type", "incident", 365);
				set_cookie("tag", "incidentMaj", 365);
		};
	} if (btn_name == "suivi_fon_i") {
		final_btn_name = "#Suivi_F# inc";
		btn.onclick = function() {
				make_i();
				set_cookie("type", "incident", 365);
				set_cookie("tag", "sf_i", 365);
		};
	} if (btn_name == "suivi_fon_d") {
		final_btn_name = "#Suivi_F# dem";
		btn.onclick = function() {
				make_i();
				set_cookie("type", "demande", 365);
				set_cookie("tag", "sf_d", 365);
		};
	} if (btn_name == "creat_dem") {
		final_btn_name = "Créer la demande";
		btn.onclick = function() {
				click_by_id("Créer la demande");
		};
	} if (btn_name == "maj") {
		final_btn_name = "Mettre à jour";
		btn.onclick = function() {
				click_by_id("Mettre à jour");
		};
	} if (btn_name == "SEP-SUPPORT") {
		final_btn_name = "SEP-SUPPORT";
		btn.accessKey = "j";
		btn.onclick = function() {
				set_cookie("service", btn_name, 365);
			  make_subtask();
		};
	}if (check_array(arr_service, btn_name) == "OK") {
		final_btn_name = btn_name;
		btn.onclick = function() {
			set_cookie("service", btn_name, 365);
			make_subtask();
		};
	} if (btn_name == "check_del") {
		final_btn_name = "Check ECO cloture";
		btn.onclick = function() {
			//del_eco();
			var n_e = del_eco();
			if (n_e.length > 0 && n_e[0] != "") {
				alert(n_e.length);
				open_eco(n_e);
			}
		};
	} if (btn_name == "old_eco") {
		final_btn_name = "Check old eco";
		btn.onclick = function() {
			//old_eco();
			var n_e = old_eco();
			//alert(n_e.length + n_e[0]);
			if (n_e.length > 0 && n_e[0] != "") {
				var c = confirm("voulez-vous ouvrir "+ n_e.length +" ECO");
				if (c == true) {
					open_eco(n_e);;
				}
			}
		};
	} if (btn_name == "all_eco") {
		final_btn_name = "Open all eco";
		btn.onclick = function() {
			var n_e = all_eco();
			if (n_e.length > 0 && n_e[0] != "") {
				var c = confirm("voulez-vous ouvrir "+ n_e.length +" ECO");
				if (c == true) {
					open_eco(n_e);;
				}
			}
		};
	} if (test == "t") {
		alert(test);
		final_btn_name = btn_name;
		btn.onclick = function() {
			set_cookie("service", btn_name, 365);
			make_subtask();
		};
	}
	var t = document.createTextNode(final_btn_name);
	btn.appendChild(t);
	if (btn_name == "trans_sgfe" || btn_name == "incid_waarp" || btn_name == "sauv_nok" || btn_name == "incid_mat" || btn_name == "incid_eon" || btn_name == "incid_maj" || btn_name == "suivi_fon_i" || btn_name == "suivi_fon_d") {
		btn.style.cssText = "border: none;margin: 10px 10px;font-size: 14px;display: inline-block;color: white;padding: 5px 5px;text-align: center;background-color: #66B3DA;";
		document.getElementById("header-top").appendChild(btn);
	} if (btn_name == "SEP-SUPPORT" || btn_name == "creat_dem" || btn_name == "maj" ) {
	  btn.style.cssText = "border: none;margin: 10px 10px;font-size: 14px;display: inline-block;color: black;padding: 5px 5px;text-align: center;background-color: #f3f3d9;";
		document.getElementById("header-top").appendChild(btn);
	} if (check_array(arr_service, btn_name) == "OK" || btn_name == "new" || btn_name == "check_del" || btn_name == "old_eco" || btn_name == "all_eco") {
		btn.style.cssText = "border: none;margin: 10px 10px;font-size: 14px;display: inline-block;color: white;padding: 5px 5px;text-align: center;background-color: #0E3C53;";
		document.getElementById("header").appendChild(btn);
	}
}

function all_eco() {
	var arr_eco = [""];
	var j = 0;
	var length_arr = document.getElementById("issuetable").rows.length;
	for(var i = 1 ; i < length_arr ; i++) {
	 var cell1 = document.getElementById("issuetable").rows[i].cells[11].innerHTML;
   var idx = cell1.lastIndexOf(">ECO-");
	 arr_eco[j] = cell1.substring(idx+1, idx+10);
	 j++;
	}
	return arr_eco;
}

function old_eco() {
	var arr_eco = [""];
	var j = 0;
	var length_arr = document.getElementById("issuetable").rows.length;
	for(var i = 1 ; i < length_arr ; i++) {
	 var cell = document.getElementById("issuetable").rows[i].cells[10].innerHTML;
	 var old_new = verif_date(cell);
	 if (old_new == "old") {
		 var cell1 = document.getElementById("issuetable").rows[i].cells[11].innerHTML;
		 //alert(cell1);
		 var idx = cell1.lastIndexOf(">ECO-");
		 arr_eco[j] = cell1.substring(idx+1, idx+10);
		 //alert(arr_eco[j]);
		 j++;
	 }
  }
	return arr_eco;
}

function del_eco() {
	var j = 0;
	var arr_eco = [""];
	var key = "";
	var length_arr = document.getElementById("issuetable").rows.length;
	for(var i = 1 ; i < length_arr ; i++) {
		var cell = document.getElementById("issuetable").rows[i].cells[11].innerHTML;
		var test_strike = cell.indexOf("<strike>ECO-");
		var idx = cell.indexOf(">,");
		if (test_strike > 0 && idx == -1) {
			key = cell.indexOf(">ECO-");
			arr_eco[j] = cell.substring(key+1, key+10);
			j++;
		}if (test_strike > 0 && idx > 0) {
			var temp_idx = 0;
			var k = 1;
			var l = 0;
			while (temp_idx > -1) {
				temp_idx = cell.indexOf(">,", temp_idx+1);
				if (temp_idx != -1) {
					k++;
				}
			}
			temp_idx = 0;
			while (temp_idx > -1) {
				temp_idx = cell.indexOf("<strike>ECO-", temp_idx+1);
				if (temp_idx != -1) {
					l++;
				}
			}
			if (l == k){
				var test_strike = cell.lastIndexOf("<strike>ECO-");
				arr_eco[j] = cell.substring(test_strike+8, test_strike+17);
				//alert("strike = " + l + " # comma = "+ k)
				//alert(arr_eco);
			  j++;
			}
		}
	}
	return arr_eco;
}

function check_array(tab, el) {
	var idx = tab.indexOf(el);
	if (idx == -1) {
		return "KO";
	} else {
		return "OK";
	}
}

function make_i() {
	click_by_id("create_link");
}

function new_eco() {
	var arr_key = [""];
	var j = 0;
	var i = 0;
	var key;
	var subtask;
	var incid;
	while (i < 51) {
		key = document.getElementById("issuetable").rows[i].cells[1].innerHTML;
		key = key.substring(63,72);
		subtask = document.getElementById("issuetable").rows[i].cells[10].innerHTML;
		subtask = subtask.trim();
		incid = document.getElementById("issuetable").rows[i].cells[2].innerHTML;
		incid = incid.trim();
		incid = incid.substring(60,61);
		if (subtask == "" && incid != "#") {
			arr_key[j] = key;
			j++;
			i++;
		} else {
			i++;
		}		
	} if (j > 0) {
		document.title = "### "+j+" NEW ### " + g_title;
	}
	return arr_key;
}

function auto_assign() {
	document.getElementById('assignee').value = get_cookie("user_name");
	click_by_id("Affecter la sollicitation");
}

function open_eco(arr) {
	set_cookie("ECO", parseInt(arr.length), 365);
	if (arr[0] != "") {
		for(var i = 0; i < arr.length; i++) {
			window.open(url_eco+ '/' +arr[i],'_blank');
		}
	}
}

function affected() {
	click_by_id("action_id_11");
}

function make_subtask() {
	click_by_id("action_id_61");
}

function click_by_id(id) {
	document.getElementById(id).dispatchEvent(new MouseEvent('click'));
}

function reload(sec) {
	setTimeout(function() {
		location.reload();
	}, sec);
}

function set_cookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
	if (cname == "ECO") {
		var old_c = get_cookie("ECO");
		cvalue = parseInt(cvalue) + parseInt(old_c);
	}
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function get_cookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function check_cookie(cname) {
    var c = get_cookie(cname);
    if (c != "") {
        c = c;
    } else {
        c = prompt("Please enter your " +cname+ " value :", "");
        if (c != "" && c != null) {
            set_cookie(cname, c, 365);
        }
    }
}
