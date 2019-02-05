exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("table_name")
		.del()
		.then(function() {
			// Inserts seed entries
			return knex("table_name").insert([
				{ id: 1, colName: "rowValue1" },
				{ id: 2, colName: "rowValue2" },
				{ id: 3, colName: "rowValue3" },
			]);
		});
};
exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("users")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("users").insert([
				{
					id: 1,
					username: "sspadazzi0",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Sylvester Spadazzi",
					role: "volunteer",
					email: "sspadazzi0@cyberchimps.com",
					phone: "689-851-2836",
				},
				{
					id: 2,
					username: "ldanilyuk1",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Lorita Danilyuk",
					role: "cook",
					email: "ldanilyuk1@cocolog-nifty.com",
					phone: "917-267-3080",
				},
				{
					id: 3,
					username: "dleeuwerink2",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Daniel Leeuwerink",
					role: "cook",
					email: "dleeuwerink2@printfriendly.com",
					phone: "439-957-9855",
				},
				{
					id: 4,
					username: "joller3",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Jerrie Oller",
					role: "cook",
					email: "joller3@ebay.co.uk",
					phone: "529-300-3099",
				},
				{
					id: 5,
					username: "lweeks4",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Leonidas Weeks",
					role: "volunteer",
					email: "lweeks4@360.cn",
					phone: "999-835-7807",
				},
				{
					id: 6,
					username: "cplowell5",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Carver Plowell",
					role: "cook",
					email: "cplowell5@un.org",
					phone: "168-240-7672",
				},
				{
					id: 7,
					username: "jdubock6",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Janis Dubock",
					role: "manager",
					email: null,
					phone: null,
				},
				{
					id: 8,
					username: "nbims7",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Nikki Bims",
					role: null,
					email: "nbims7@bing.com",
					phone: "424-990-0752",
				},
				{
					id: 9,
					username: "rspafford8",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Rubia Spafford",
					role: "cook",
					email: "rspafford8@discuz.net",
					phone: "340-850-3430",
				},
				{
					id: 10,
					username: "kcogzell9",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Karisa Cogzell",
					role: "volunteer",
					email: "kcogzell9@lycos.com",
					phone: "442-973-5413",
				},
				{
					id: 11,
					username: "sbelduma",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: null,
					role: null,
					email: "mpoyzera@canalblog.com",
					phone: null,
				},
				{
					id: 12,
					username: "cpiotrb",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Camila Piotr",
					role: "cook",
					email: "cpiotrb@chicagotribune.com",
					phone: null,
				},
				{
					id: 13,
					username: "ggrindellc",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Gustie Grindell",
					role: null,
					email: "ggrindellc@imageshack.us",
					phone: "254-614-5242",
				},
				{
					id: 14,
					username: "mallmondd",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Mayor Allmond",
					role: "manager",
					email: "mallmondd@apache.org",
					phone: "265-297-9927",
				},
				{
					id: 15,
					username: "sdacee",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Steffen Dace",
					role: null,
					email: "sdacee@wikispaces.com",
					phone: null,
				},
				{
					id: 16,
					username: "msurmeirf",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Mic Surmeir",
					role: null,
					email: "msurmeirf@cargocollective.com",
					phone: null,
				},
				{
					id: 17,
					username: "vcanaang",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Verna Canaan",
					role: "volunteer",
					email: "vcanaang@netscape.com",
					phone: null,
				},
				{
					id: 18,
					username: "apayleyh",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Annnora Payley",
					role: "volunteer",
					email: "apayleyh@npr.org",
					phone: null,
				},
				{
					id: 19,
					username: "aarundalei",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Anette Arundale",
					role: "cook",
					email: "aarundalei@example.com",
					phone: "979-638-8254",
				},
				{
					id: 20,
					username: "jdacthj",
					password:
						"$2a$12$xVpA0p3B.FpwjFPTVOV4Me43hgy1pW3Teen3NW/zkDx4ec/pITJMu",
					name: "Jaquenette D'Acth",
					role: "volunteer",
					email: "jdacthj@ihg.com",
					phone: "710-804-5935",
				},
			]);
		});
};
