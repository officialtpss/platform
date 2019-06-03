const sicList = [
  {
    "SIC": "01110",
    "description": "Growing of cereals (except rice), leguminous crops and oil seeds"
  },
  {
    "SIC": "01120",
    "description": "Growing of rice"
  },
  {
    "SIC": "01130",
    "description": "Growing of vegetables and melons, roots and tubers"
  },
  {
    "SIC": "01140",
    "description": "Growing of sugar cane"
  },
  {
    "SIC": "01150",
    "description": "Growing of tobacco"
  },
  {
    "SIC": "01160",
    "description": "Growing of fibre crops"
  },
  {
    "SIC": "01190",
    "description": "Growing of other non-perennial crops"
  },
  {
    "SIC": "01210",
    "description": "Growing of grapes"
  },
  {
    "SIC": "01220",
    "description": "Growing of tropical and subtropical fruits"
  },
  {
    "SIC": "01230",
    "description": "Growing of citrus fruits"
  },
  {
    "SIC": "01240",
    "description": "Growing of pome fruits and stone fruits"
  },
  {
    "SIC": "01250",
    "description": "Growing of other tree and bush fruits and nuts"
  },
  {
    "SIC": "01260",
    "description": "Growing of oleaginous fruits"
  },
  {
    "SIC": "01270",
    "description": "Growing of beverage crops"
  },
  {
    "SIC": "01280",
    "description": "Growing of spices, aromatic, drug and pharmaceutical crops"
  },
  {
    "SIC": "01290",
    "description": "Growing of other perennial crops"
  },
  {
    "SIC": "01300",
    "description": "Plant propagation"
  },
  {
    "SIC": "01410",
    "description": "Raising of dairy cattle"
  },
  {
    "SIC": "01420",
    "description": "Raising of other cattle and buffaloes"
  },
  {
    "SIC": "01430",
    "description": "Raising of horses and other equines"
  },
  {
    "SIC": "01440",
    "description": "Raising of camels and camelids"
  },
  {
    "SIC": "01450",
    "description": "Raising of sheep and goats"
  },
  {
    "SIC": "01460",
    "description": "Raising of swine/pigs"
  },
  {
    "SIC": "01470",
    "description": "Raising of poultry"
  },
  {
    "SIC": "01490",
    "description": "Raising of other animals"
  },
  {
    "SIC": "01500",
    "description": "Mixed farming"
  },
  {
    "SIC": "01610",
    "description": "Support activities for crop production"
  },
  {
    "SIC": "01621",
    "description": "Farm animal boarding and care"
  },
  {
    "SIC": "01629",
    "description": "Support activities for animal production (other than farm animal boarding and care) n.e.c."
  },
  {
    "SIC": "01630",
    "description": "Post-harvest crop activities"
  },
  {
    "SIC": "01640",
    "description": "Seed processing for propagation"
  },
  {
    "SIC": "01700",
    "description": "Hunting, trapping and related service activities"
  },
  {
    "SIC": "02100",
    "description": "Silviculture and other forestry activities"
  },
  {
    "SIC": "02200",
    "description": "Logging"
  },
  {
    "SIC": "02300",
    "description": "Gathering of wild growing non-wood products"
  },
  {
    "SIC": "02400",
    "description": "Support services to forestry"
  },
  {
    "SIC": "03110",
    "description": "Marine fishing"
  },
  {
    "SIC": "03120",
    "description": "Freshwater fishing"
  },
  {
    "SIC": "03210",
    "description": "Marine aquaculture"
  },
  {
    "SIC": "03220",
    "description": "Freshwater aquaculture"
  },
  {
    "SIC": "05101",
    "description": "Deep coal mines"
  },
  {
    "SIC": "05102",
    "description": "Open cast coal working"
  },
  {
    "SIC": "05200",
    "description": "Mining of lignite"
  },
  {
    "SIC": "06100",
    "description": "Extraction of crude petroleum"
  },
  {
    "SIC": "06200",
    "description": "Extraction of natural gas"
  },
  {
    "SIC": "07100",
    "description": "Mining of iron ores"
  },
  {
    "SIC": "07210",
    "description": "Mining of uranium and thorium ores"
  },
  {
    "SIC": "07290",
    "description": "Mining of other non-ferrous metal ores"
  },
  {
    "SIC": "08110",
    "description": "Quarrying of ornamental and building stone, limestone, gypsum, chalk and slate"
  },
  {
    "SIC": "08120",
    "description": "Operation of gravel and sand pits; mining of clays and kaolin"
  },
  {
    "SIC": "08910",
    "description": "Mining of chemical and fertilizer minerals"
  },
  {
    "SIC": "08920",
    "description": "Extraction of peat"
  },
  {
    "SIC": "08930",
    "description": "Extraction of salt"
  },
  {
    "SIC": "08990",
    "description": "Other mining and quarrying n.e.c."
  },
  {
    "SIC": "09100",
    "description": "Support activities for petroleum and natural gas extraction"
  },
  {
    "SIC": "09900",
    "description": "Support activities for other mining and quarrying"
  },
  {
    "SIC": "10110",
    "description": "Processing and preserving of meat"
  },
  {
    "SIC": "10120",
    "description": "Processing and preserving of poultry meat"
  },
  {
    "SIC": "10130",
    "description": "Production of meat and poultry meat products"
  },
  {
    "SIC": "10200",
    "description": "Processing and preserving of fish, crustaceans and molluscs"
  },
  {
    "SIC": "10310",
    "description": "Processing and preserving of potatoes"
  },
  {
    "SIC": "10320",
    "description": "Manufacture of fruit and vegetable juice"
  },
  {
    "SIC": "10390",
    "description": "Other processing and preserving of fruit and vegetables"
  },
  {
    "SIC": "10410",
    "description": "Manufacture of oils and fats"
  },
  {
    "SIC": "10420",
    "description": "Manufacture of margarine and similar edible fats"
  },
  {
    "SIC": "10511",
    "description": "Liquid milk and cream production"
  },
  {
    "SIC": "10512",
    "description": "Butter and cheese production"
  },
  {
    "SIC": "10519",
    "description": "Manufacture of other milk products"
  },
  {
    "SIC": "10520",
    "description": "Manufacture of ice cream"
  },
  {
    "SIC": "10611",
    "description": "Grain milling"
  },
  {
    "SIC": "10612",
    "description": "Manufacture of breakfast cereals and cereals-based food"
  },
  {
    "SIC": "10620",
    "description": "Manufacture of starches and starch products"
  },
  {
    "SIC": "10710",
    "description": "Manufacture of bread; manufacture of fresh pastry goods and cakes"
  },
  {
    "SIC": "10720",
    "description": "Manufacture of rusks and biscuits; manufacture of preserved pastry goods and cakes"
  },
  {
    "SIC": "10730",
    "description": "Manufacture of macaroni, noodles, couscous and similar farinaceous products"
  },
  {
    "SIC": "10810",
    "description": "Manufacture of sugar"
  },
  {
    "SIC": "10821",
    "description": "Manufacture of cocoa and chocolate confectionery"
  },
  {
    "SIC": "10822",
    "description": "Manufacture of sugar confectionery"
  },
  {
    "SIC": "10831",
    "description": "Tea processing"
  },
  {
    "SIC": "10832",
    "description": "Production of coffee and coffee substitutes"
  },
  {
    "SIC": "10840",
    "description": "Manufacture of condiments and seasonings"
  },
  {
    "SIC": "10850",
    "description": "Manufacture of prepared meals and dishes"
  },
  {
    "SIC": "10860",
    "description": "Manufacture of homogenized food preparations and dietetic food"
  },
  {
    "SIC": "10890",
    "description": "Manufacture of other food products n.e.c."
  },
  {
    "SIC": "10910",
    "description": "Manufacture of prepared feeds for farm animals"
  },
  {
    "SIC": "10920",
    "description": "Manufacture of prepared pet foods"
  },
  {
    "SIC": "11010",
    "description": "Distilling, rectifying and blending of spirits"
  },
  {
    "SIC": "11020",
    "description": "Manufacture of wine from grape"
  },
  {
    "SIC": "11030",
    "description": "Manufacture of cider and other fruit wines"
  },
  {
    "SIC": "11040",
    "description": "Manufacture of other non-distilled fermented beverages"
  },
  {
    "SIC": "11050",
    "description": "Manufacture of beer"
  },
  {
    "SIC": "11060",
    "description": "Manufacture of malt"
  },
  {
    "SIC": "11070",
    "description": "Manufacture of soft drinks; production of mineral waters and other bottled waters"
  },
  {
    "SIC": "12000",
    "description": "Manufacture of tobacco products"
  },
  {
    "SIC": "13100",
    "description": "Preparation and spinning of textile fibres"
  },
  {
    "SIC": "13200",
    "description": "Weaving of textiles"
  },
  {
    "SIC": "13300",
    "description": "Finishing of textiles"
  },
  {
    "SIC": "13910",
    "description": "Manufacture of knitted and crocheted fabrics"
  },
  {
    "SIC": "13921",
    "description": "Manufacture of soft furnishings"
  },
  {
    "SIC": "13922",
    "description": "manufacture of canvas goods, sacks, etc."
  },
  {
    "SIC": "13923",
    "description": "manufacture of household textiles"
  },
  {
    "SIC": "13931",
    "description": "Manufacture of woven or tufted carpets and rugs"
  },
  {
    "SIC": "13939",
    "description": "Manufacture of other carpets and rugs"
  },
  {
    "SIC": "13940",
    "description": "Manufacture of cordage, rope, twine and netting"
  },
  {
    "SIC": "13950",
    "description": "Manufacture of non-wovens and articles made from non-wovens, except apparel"
  },
  {
    "SIC": "13960",
    "description": "Manufacture of other technical and industrial textiles"
  },
  {
    "SIC": "13990",
    "description": "Manufacture of other textiles n.e.c."
  },
  {
    "SIC": "14110",
    "description": "Manufacture of leather clothes"
  },
  {
    "SIC": "14120",
    "description": "Manufacture of workwear"
  },
  {
    "SIC": "14131",
    "description": "Manufacture of other men's outerwear"
  },
  {
    "SIC": "14132",
    "description": "Manufacture of other women's outerwear"
  },
  {
    "SIC": "14141",
    "description": "Manufacture of men's underwear"
  },
  {
    "SIC": "14142",
    "description": "Manufacture of women's underwear"
  },
  {
    "SIC": "14190",
    "description": "Manufacture of other wearing apparel and accessories n.e.c."
  },
  {
    "SIC": "14200",
    "description": "Manufacture of articles of fur"
  },
  {
    "SIC": "14310",
    "description": "Manufacture of knitted and crocheted hosiery"
  },
  {
    "SIC": "14390",
    "description": "Manufacture of other knitted and crocheted apparel"
  },
  {
    "SIC": "15110",
    "description": "Tanning and dressing of leather; dressing and dyeing of fur"
  },
  {
    "SIC": "15120",
    "description": "Manufacture of luggage, handbags and the like, saddlery and harness"
  },
  {
    "SIC": "15200",
    "description": "Manufacture of footwear"
  },
  {
    "SIC": "16100",
    "description": "Sawmilling and planing of wood"
  },
  {
    "SIC": "16210",
    "description": "Manufacture of veneer sheets and wood-based panels"
  },
  {
    "SIC": "16220",
    "description": "Manufacture of assembled parquet floors"
  },
  {
    "SIC": "16230",
    "description": "Manufacture of other builders' carpentry and joinery"
  },
  {
    "SIC": "16240",
    "description": "Manufacture of wooden containers"
  },
  {
    "SIC": "16290",
    "description": "Manufacture of other products of wood; manufacture of articles of cork, straw and plaiting materials"
  },
  {
    "SIC": "17110",
    "description": "Manufacture of pulp"
  },
  {
    "SIC": "17120",
    "description": "Manufacture of paper and paperboard"
  },
  {
    "SIC": "17211",
    "description": "Manufacture of corrugated paper and paperboard, sacks and bags"
  },
  {
    "SIC": "17219",
    "description": "Manufacture of other paper and paperboard containers"
  },
  {
    "SIC": "17220",
    "description": "Manufacture of household and sanitary goods and of toilet requisites"
  },
  {
    "SIC": "17230",
    "description": "Manufacture of paper stationery"
  },
  {
    "SIC": "17240",
    "description": "Manufacture of wallpaper"
  },
  {
    "SIC": "17290",
    "description": "Manufacture of other articles of paper and paperboard n.e.c."
  },
  {
    "SIC": "18110",
    "description": "Printing of newspapers"
  },
  {
    "SIC": "18121",
    "description": "Manufacture of printed labels"
  },
  {
    "SIC": "18129",
    "description": "Printing n.e.c."
  },
  {
    "SIC": "18130",
    "description": "Pre-press and pre-media services"
  },
  {
    "SIC": "18140",
    "description": "Binding and related services"
  },
  {
    "SIC": "18201",
    "description": "Reproduction of sound recording"
  },
  {
    "SIC": "18202",
    "description": "Reproduction of video recording"
  },
  {
    "SIC": "18203",
    "description": "Reproduction of computer media"
  },
  {
    "SIC": "19100",
    "description": "Manufacture of coke oven products"
  },
  {
    "SIC": "19201",
    "description": "Mineral oil refining"
  },
  {
    "SIC": "19209",
    "description": "Other treatment of petroleum products (excluding petrochemicals manufacture)"
  },
  {
    "SIC": "20110",
    "description": "Manufacture of industrial gases"
  },
  {
    "SIC": "20120",
    "description": "Manufacture of dyes and pigments"
  },
  {
    "SIC": "20130",
    "description": "Manufacture of other inorganic basic chemicals"
  },
  {
    "SIC": "20140",
    "description": "Manufacture of other organic basic chemicals"
  },
  {
    "SIC": "20150",
    "description": "Manufacture of fertilizers and nitrogen compounds"
  },
  {
    "SIC": "20160",
    "description": "Manufacture of plastics in primary forms"
  },
  {
    "SIC": "20170",
    "description": "Manufacture of synthetic rubber in primary forms"
  },
  {
    "SIC": "20200",
    "description": "Manufacture of pesticides and other agrochemical products"
  },
  {
    "SIC": "20301",
    "description": "Manufacture of paints, varnishes and similar coatings, mastics and sealants"
  },
  {
    "SIC": "20302",
    "description": "Manufacture of printing ink"
  },
  {
    "SIC": "20411",
    "description": "Manufacture of soap and detergents"
  },
  {
    "SIC": "20412",
    "description": "Manufacture of cleaning and polishing preparations"
  },
  {
    "SIC": "20420",
    "description": "Manufacture of perfumes and toilet preparations"
  },
  {
    "SIC": "20510",
    "description": "Manufacture of explosives"
  },
  {
    "SIC": "20520",
    "description": "Manufacture of glues"
  },
  {
    "SIC": "20530",
    "description": "Manufacture of essential oils"
  },
  {
    "SIC": "20590",
    "description": "Manufacture of other chemical products n.e.c."
  },
  {
    "SIC": "20600",
    "description": "Manufacture of man-made fibres"
  },
  {
    "SIC": "21100",
    "description": "Manufacture of basic pharmaceutical products"
  },
  {
    "SIC": "21200",
    "description": "Manufacture of pharmaceutical preparations"
  },
  {
    "SIC": "22110",
    "description": "Manufacture of rubber tyres and tubes; retreading and rebuilding of rubber tyres"
  },
  {
    "SIC": "22190",
    "description": "Manufacture of other rubber products"
  },
  {
    "SIC": "22210",
    "description": "Manufacture of plastic plates, sheets, tubes and profiles"
  },
  {
    "SIC": "22220",
    "description": "Manufacture of plastic packing goods"
  },
  {
    "SIC": "22230",
    "description": "Manufacture of builders ware of plastic"
  },
  {
    "SIC": "22290",
    "description": "Manufacture of other plastic products"
  },
  {
    "SIC": "23110",
    "description": "Manufacture of flat glass"
  },
  {
    "SIC": "23120",
    "description": "Shaping and processing of flat glass"
  },
  {
    "SIC": "23130",
    "description": "Manufacture of hollow glass"
  },
  {
    "SIC": "23140",
    "description": "Manufacture of glass fibres"
  },
  {
    "SIC": "23190",
    "description": "Manufacture and processing of other glass, including technical glassware"
  },
  {
    "SIC": "23200",
    "description": "Manufacture of refractory products"
  },
  {
    "SIC": "23310",
    "description": "Manufacture of ceramic tiles and flags"
  },
  {
    "SIC": "23320",
    "description": "Manufacture of bricks, tiles and construction products, in baked clay"
  },
  {
    "SIC": "23410",
    "description": "Manufacture of ceramic household and ornamental articles"
  },
  {
    "SIC": "23420",
    "description": "Manufacture of ceramic sanitary fixtures"
  },
  {
    "SIC": "23430",
    "description": "Manufacture of ceramic insulators and insulating fittings"
  },
  {
    "SIC": "23440",
    "description": "Manufacture of other technical ceramic products"
  },
  {
    "SIC": "23490",
    "description": "Manufacture of other ceramic products n.e.c."
  },
  {
    "SIC": "23510",
    "description": "Manufacture of cement"
  },
  {
    "SIC": "23520",
    "description": "Manufacture of lime and plaster"
  },
  {
    "SIC": "23610",
    "description": "Manufacture of concrete products for construction purposes"
  },
  {
    "SIC": "23620",
    "description": "Manufacture of plaster products for construction purposes"
  },
  {
    "SIC": "23630",
    "description": "Manufacture of ready-mixed concrete"
  },
  {
    "SIC": "23640",
    "description": "Manufacture of mortars"
  },
  {
    "SIC": "23650",
    "description": "Manufacture of fibre cement"
  },
  {
    "SIC": "23690",
    "description": "Manufacture of other articles of concrete, plaster and cement"
  },
  {
    "SIC": "23700",
    "description": "Cutting, shaping and finishing of stone"
  },
  {
    "SIC": "23910",
    "description": "Production of abrasive products"
  },
  {
    "SIC": "23990",
    "description": "Manufacture of other non-metallic mineral products n.e.c."
  },
  {
    "SIC": "24100",
    "description": "Manufacture of basic iron and steel and of ferro-alloys"
  },
  {
    "SIC": "24200",
    "description": "Manufacture of tubes, pipes, hollow profiles and related fittings, of steel"
  },
  {
    "SIC": "24310",
    "description": "Cold drawing of bars"
  },
  {
    "SIC": "24320",
    "description": "Cold rolling of narrow strip"
  },
  {
    "SIC": "24330",
    "description": "Cold forming or folding"
  },
  {
    "SIC": "24340",
    "description": "Cold drawing of wire"
  },
  {
    "SIC": "24410",
    "description": "Precious metals production"
  },
  {
    "SIC": "24420",
    "description": "Aluminium production"
  },
  {
    "SIC": "24430",
    "description": "Lead, zinc and tin production"
  },
  {
    "SIC": "24440",
    "description": "Copper production"
  },
  {
    "SIC": "24450",
    "description": "Other non-ferrous metal production"
  },
  {
    "SIC": "24460",
    "description": "Processing of nuclear fuel"
  },
  {
    "SIC": "24510",
    "description": "Casting of iron"
  },
  {
    "SIC": "24520",
    "description": "Casting of steel"
  },
  {
    "SIC": "24530",
    "description": "Casting of light metals"
  },
  {
    "SIC": "24540",
    "description": "Casting of other non-ferrous metals"
  },
  {
    "SIC": "25110",
    "description": "Manufacture of metal structures and parts of structures"
  },
  {
    "SIC": "25120",
    "description": "Manufacture of doors and windows of metal"
  },
  {
    "SIC": "25210",
    "description": "Manufacture of central heating radiators and boilers"
  },
  {
    "SIC": "25290",
    "description": "Manufacture of other tanks, reservoirs and containers of metal"
  },
  {
    "SIC": "25300",
    "description": "Manufacture of steam generators, except central heating hot water boilers"
  },
  {
    "SIC": "25400",
    "description": "Manufacture of weapons and ammunition"
  },
  {
    "SIC": "25500",
    "description": "Forging, pressing, stamping and roll-forming of metal; powder metallurgy"
  },
  {
    "SIC": "25610",
    "description": "Treatment and coating of metals"
  },
  {
    "SIC": "25620",
    "description": "Machining"
  },
  {
    "SIC": "25710",
    "description": "Manufacture of cutlery"
  },
  {
    "SIC": "25720",
    "description": "Manufacture of locks and hinges"
  },
  {
    "SIC": "25730",
    "description": "Manufacture of tools"
  },
  {
    "SIC": "25910",
    "description": "Manufacture of steel drums and similar containers"
  },
  {
    "SIC": "25920",
    "description": "Manufacture of light metal packaging"
  },
  {
    "SIC": "25930",
    "description": "Manufacture of wire products, chain and springs"
  },
  {
    "SIC": "25940",
    "description": "Manufacture of fasteners and screw machine products"
  },
  {
    "SIC": "25990",
    "description": "Manufacture of other fabricated metal products n.e.c."
  },
  {
    "SIC": "26110",
    "description": "Manufacture of electronic components"
  },
  {
    "SIC": "26120",
    "description": "Manufacture of loaded electronic boards"
  },
  {
    "SIC": "26200",
    "description": "Manufacture of computers and peripheral equipment"
  },
  {
    "SIC": "26301",
    "description": "Manufacture of telegraph and telephone apparatus and equipment"
  },
  {
    "SIC": "26309",
    "description": "Manufacture of communication equipment other than telegraph, and telephone apparatus and equipment"
  },
  {
    "SIC": "26400",
    "description": "Manufacture of consumer electronics"
  },
  {
    "SIC": "26511",
    "description": "Manufacture of electronic measuring, testing etc. equipment, not for industrial process control"
  },
  {
    "SIC": "26512",
    "description": "Manufacture of electronic industrial process control equipment"
  },
  {
    "SIC": "26513",
    "description": "Manufacture of non-electronic measuring, testing etc. equipment, not for industrial process control"
  },
  {
    "SIC": "26514",
    "description": "Manufacture of non-electronic industrial process control equipment"
  },
  {
    "SIC": "26520",
    "description": "Manufacture of watches and clocks"
  },
  {
    "SIC": "26600",
    "description": "Manufacture of irradiation, electromedical and electrotherapeutic equipment"
  },
  {
    "SIC": "26701",
    "description": "Manufacture of optical precision instruments"
  },
  {
    "SIC": "26702",
    "description": "Manufacture of photographic and cinematographic equipment"
  },
  {
    "SIC": "26800",
    "description": "Manufacture of magnetic and optical media"
  },
  {
    "SIC": "27110",
    "description": "Manufacture of electric motors, generators and transformers"
  },
  {
    "SIC": "27120",
    "description": "Manufacture of electricity distribution and control apparatus"
  },
  {
    "SIC": "27200",
    "description": "Manufacture of batteries and accumulators"
  },
  {
    "SIC": "27310",
    "description": "Manufacture of fibre optic cables"
  },
  {
    "SIC": "27320",
    "description": "Manufacture of other electronic and electric wires and cables"
  },
  {
    "SIC": "27330",
    "description": "Manufacture of wiring devices"
  },
  {
    "SIC": "27400",
    "description": "Manufacture of electric lighting equipment"
  },
  {
    "SIC": "27510",
    "description": "Manufacture of electric domestic appliances"
  },
  {
    "SIC": "27520",
    "description": "Manufacture of non-electric domestic appliances"
  },
  {
    "SIC": "27900",
    "description": "Manufacture of other electrical equipment"
  },
  {
    "SIC": "28110",
    "description": "Manufacture of engines and turbines, except aircraft, vehicle and cycle engines"
  },
  {
    "SIC": "28120",
    "description": "Manufacture of fluid power equipment"
  },
  {
    "SIC": "28131",
    "description": "Manufacture of pumps"
  },
  {
    "SIC": "28132",
    "description": "Manufacture of compressors"
  },
  {
    "SIC": "28140",
    "description": "Manufacture of taps and valves"
  },
  {
    "SIC": "28150",
    "description": "Manufacture of bearings, gears, gearing and driving elements"
  },
  {
    "SIC": "28210",
    "description": "Manufacture of ovens, furnaces and furnace burners"
  },
  {
    "SIC": "28220",
    "description": "Manufacture of lifting and handling equipment"
  },
  {
    "SIC": "28230",
    "description": "Manufacture of office machinery and equipment (except computers and peripheral equipment)"
  },
  {
    "SIC": "28240",
    "description": "Manufacture of power-driven hand tools"
  },
  {
    "SIC": "28250",
    "description": "Manufacture of non-domestic cooling and ventilation equipment"
  },
  {
    "SIC": "28290",
    "description": "Manufacture of other general-purpose machinery n.e.c."
  },
  {
    "SIC": "28301",
    "description": "Manufacture of agricultural tractors"
  },
  {
    "SIC": "28302",
    "description": "Manufacture of agricultural and forestry machinery other than tractors"
  },
  {
    "SIC": "28410",
    "description": "Manufacture of metal forming machinery"
  },
  {
    "SIC": "28490",
    "description": "Manufacture of other machine tools"
  },
  {
    "SIC": "28910",
    "description": "Manufacture of machinery for metallurgy"
  },
  {
    "SIC": "28921",
    "description": "Manufacture of machinery for mining"
  },
  {
    "SIC": "28922",
    "description": "Manufacture of earthmoving equipment"
  },
  {
    "SIC": "28923",
    "description": "Manufacture of equipment for concrete crushing and screening and roadworks"
  },
  {
    "SIC": "28930",
    "description": "Manufacture of machinery for food, beverage and tobacco processing"
  },
  {
    "SIC": "28940",
    "description": "Manufacture of machinery for textile, apparel and leather production"
  },
  {
    "SIC": "28950",
    "description": "Manufacture of machinery for paper and paperboard production"
  },
  {
    "SIC": "28960",
    "description": "Manufacture of plastics and rubber machinery"
  },
  {
    "SIC": "28990",
    "description": "Manufacture of other special-purpose machinery n.e.c."
  },
  {
    "SIC": "29100",
    "description": "Manufacture of motor vehicles"
  },
  {
    "SIC": "29201",
    "description": "Manufacture of bodies (coachwork) for motor vehicles (except caravans)"
  },
  {
    "SIC": "29202",
    "description": "Manufacture of trailers and semi-trailers"
  },
  {
    "SIC": "29203",
    "description": "Manufacture of caravans"
  },
  {
    "SIC": "29310",
    "description": "Manufacture of electrical and electronic equipment for motor vehicles and their engines"
  },
  {
    "SIC": "29320",
    "description": "Manufacture of other parts and accessories for motor vehicles"
  },
  {
    "SIC": "30110",
    "description": "Building of ships and floating structures"
  },
  {
    "SIC": "30120",
    "description": "Building of pleasure and sporting boats"
  },
  {
    "SIC": "30200",
    "description": "Manufacture of railway locomotives and rolling stock"
  },
  {
    "SIC": "30300",
    "description": "Manufacture of air and spacecraft and related machinery"
  },
  {
    "SIC": "30400",
    "description": "Manufacture of military fighting vehicles"
  },
  {
    "SIC": "30910",
    "description": "Manufacture of motorcycles"
  },
  {
    "SIC": "30920",
    "description": "Manufacture of bicycles and invalid carriages"
  },
  {
    "SIC": "30990",
    "description": "Manufacture of other transport equipment n.e.c."
  },
  {
    "SIC": "31010",
    "description": "Manufacture of office and shop furniture"
  },
  {
    "SIC": "31020",
    "description": "Manufacture of kitchen furniture"
  },
  {
    "SIC": "31030",
    "description": "Manufacture of mattresses"
  },
  {
    "SIC": "31090",
    "description": "Manufacture of other furniture"
  },
  {
    "SIC": "32110",
    "description": "Striking of coins"
  },
  {
    "SIC": "32120",
    "description": "Manufacture of jewellery and related articles"
  },
  {
    "SIC": "32130",
    "description": "Manufacture of imitation jewellery and related articles"
  },
  {
    "SIC": "32200",
    "description": "Manufacture of musical instruments"
  },
  {
    "SIC": "32300",
    "description": "Manufacture of sports goods"
  },
  {
    "SIC": "32401",
    "description": "Manufacture of professional and arcade games and toys"
  },
  {
    "SIC": "32409",
    "description": "Manufacture of other games and toys, n.e.c."
  },
  {
    "SIC": "32500",
    "description": "Manufacture of medical and dental instruments and supplies"
  },
  {
    "SIC": "32910",
    "description": "Manufacture of brooms and brushes"
  },
  {
    "SIC": "32990",
    "description": "Other manufacturing n.e.c."
  },
  {
    "SIC": "33110",
    "description": "Repair of fabricated metal products"
  },
  {
    "SIC": "33120",
    "description": "Repair of machinery"
  },
  {
    "SIC": "33130",
    "description": "Repair of electronic and optical equipment"
  },
  {
    "SIC": "33140",
    "description": "Repair of electrical equipment"
  },
  {
    "SIC": "33150",
    "description": "Repair and maintenance of ships and boats"
  },
  {
    "SIC": "33160",
    "description": "Repair and maintenance of aircraft and spacecraft"
  },
  {
    "SIC": "33170",
    "description": "Repair and maintenance of other transport equipment n.e.c."
  },
  {
    "SIC": "33190",
    "description": "Repair of other equipment"
  },
  {
    "SIC": "33200",
    "description": "Installation of industrial machinery and equipment"
  },
  {
    "SIC": "35110",
    "description": "Production of electricity"
  },
  {
    "SIC": "35120",
    "description": "Transmission of electricity"
  },
  {
    "SIC": "35130",
    "description": "Distribution of electricity"
  },
  {
    "SIC": "35140",
    "description": "Trade of electricity"
  },
  {
    "SIC": "35210",
    "description": "Manufacture of gas"
  },
  {
    "SIC": "35220",
    "description": "Distribution of gaseous fuels through mains"
  },
  {
    "SIC": "35230",
    "description": "Trade of gas through mains"
  },
  {
    "SIC": "35300",
    "description": "Steam and air conditioning supply"
  },
  {
    "SIC": "36000",
    "description": "Water collection, treatment and supply"
  },
  {
    "SIC": "37000",
    "description": "Sewerage"
  },
  {
    "SIC": "38110",
    "description": "Collection of non-hazardous waste"
  },
  {
    "SIC": "38120",
    "description": "Collection of hazardous waste"
  },
  {
    "SIC": "38210",
    "description": "Treatment and disposal of non-hazardous waste"
  },
  {
    "SIC": "38220",
    "description": "Treatment and disposal of hazardous waste"
  },
  {
    "SIC": "38310",
    "description": "Dismantling of wrecks"
  },
  {
    "SIC": "38320",
    "description": "Recovery of sorted materials"
  },
  {
    "SIC": "39000",
    "description": "Remediation activities and other waste management services"
  },
  {
    "SIC": "41100",
    "description": "Development of building projects"
  },
  {
    "SIC": "41201",
    "description": "Construction of commercial buildings"
  },
  {
    "SIC": "41202",
    "description": "Construction of domestic buildings"
  },
  {
    "SIC": "42110",
    "description": "Construction of roads and motorways"
  },
  {
    "SIC": "42120",
    "description": "Construction of railways and underground railways"
  },
  {
    "SIC": "42130",
    "description": "Construction of bridges and tunnels"
  },
  {
    "SIC": "42210",
    "description": "Construction of utility projects for fluids"
  },
  {
    "SIC": "42220",
    "description": "Construction of utility projects for electricity and telecommunications"
  },
  {
    "SIC": "42910",
    "description": "Construction of water projects"
  },
  {
    "SIC": "42990",
    "description": "Construction of other civil engineering projects n.e.c."
  },
  {
    "SIC": "43110",
    "description": "Demolition"
  },
  {
    "SIC": "43120",
    "description": "Site preparation"
  },
  {
    "SIC": "43130",
    "description": "Test drilling and boring"
  },
  {
    "SIC": "43210",
    "description": "Electrical installation"
  },
  {
    "SIC": "43220",
    "description": "Plumbing, heat and air-conditioning installation"
  },
  {
    "SIC": "43290",
    "description": "Other construction installation"
  },
  {
    "SIC": "43310",
    "description": "Plastering"
  },
  {
    "SIC": "43320",
    "description": "Joinery installation"
  },
  {
    "SIC": "43330",
    "description": "Floor and wall covering"
  },
  {
    "SIC": "43341",
    "description": "Painting"
  },
  {
    "SIC": "43342",
    "description": "Glazing"
  },
  {
    "SIC": "43390",
    "description": "Other building completion and finishing"
  },
  {
    "SIC": "43910",
    "description": "Roofing activities"
  },
  {
    "SIC": "43991",
    "description": "Scaffold erection"
  },
  {
    "SIC": "43999",
    "description": "Other specialised construction activities n.e.c."
  },
  {
    "SIC": "45111",
    "description": "Sale of new cars and light motor vehicles"
  },
  {
    "SIC": "45112",
    "description": "Sale of used cars and light motor vehicles"
  },
  {
    "SIC": "45190",
    "description": "Sale of other motor vehicles"
  },
  {
    "SIC": "45200",
    "description": "Maintenance and repair of motor vehicles"
  },
  {
    "SIC": "45310",
    "description": "Wholesale trade of motor vehicle parts and accessories"
  },
  {
    "SIC": "45320",
    "description": "Retail trade of motor vehicle parts and accessories"
  },
  {
    "SIC": "45400",
    "description": "Sale, maintenance and repair of motorcycles and related parts and accessories"
  },
  {
    "SIC": "46110",
    "description": "Agents selling agricultural raw materials, livestock, textile raw materials and semi-finished goods"
  },
  {
    "SIC": "46120",
    "description": "Agents involved in the sale of fuels, ores, metals and industrial chemicals"
  },
  {
    "SIC": "46130",
    "description": "Agents involved in the sale of timber and building materials"
  },
  {
    "SIC": "46140",
    "description": "Agents involved in the sale of machinery, industrial equipment, ships and aircraft"
  },
  {
    "SIC": "46150",
    "description": "Agents involved in the sale of furniture, household goods, hardware and ironmongery"
  },
  {
    "SIC": "46160",
    "description": "Agents involved in the sale of textiles, clothing, fur, footwear and leather goods"
  },
  {
    "SIC": "46170",
    "description": "Agents involved in the sale of food, beverages and tobacco"
  },
  {
    "SIC": "46180",
    "description": "Agents specialized in the sale of other particular products"
  },
  {
    "SIC": "46190",
    "description": "Agents involved in the sale of a variety of goods"
  },
  {
    "SIC": "46210",
    "description": "Wholesale of grain, unmanufactured tobacco, seeds and animal feeds"
  },
  {
    "SIC": "46220",
    "description": "Wholesale of flowers and plants"
  },
  {
    "SIC": "46230",
    "description": "Wholesale of live animals"
  },
  {
    "SIC": "46240",
    "description": "Wholesale of hides, skins and leather"
  },
  {
    "SIC": "46310",
    "description": "Wholesale of fruit and vegetables"
  },
  {
    "SIC": "46320",
    "description": "Wholesale of meat and meat products"
  },
  {
    "SIC": "46330",
    "description": "Wholesale of dairy products, eggs and edible oils and fats"
  },
  {
    "SIC": "46341",
    "description": "Wholesale of fruit and vegetable juices, mineral water and soft drinks"
  },
  {
    "SIC": "46342",
    "description": "Wholesale of wine, beer, spirits and other alcoholic beverages"
  },
  {
    "SIC": "46350",
    "description": "Wholesale of tobacco products"
  },
  {
    "SIC": "46360",
    "description": "Wholesale of sugar and chocolate and sugar confectionery"
  },
  {
    "SIC": "46370",
    "description": "Wholesale of coffee, tea, cocoa and spices"
  },
  {
    "SIC": "46380",
    "description": "Wholesale of other food, including fish, crustaceans and molluscs"
  },
  {
    "SIC": "46390",
    "description": "Non-specialised wholesale of food, beverages and tobacco"
  },
  {
    "SIC": "46410",
    "description": "Wholesale of textiles"
  },
  {
    "SIC": "46420",
    "description": "Wholesale of clothing and footwear"
  },
  {
    "SIC": "46431",
    "description": "Wholesale of audio tapes, records, CDs and video tapes and the equipment on which these are played"
  },
  {
    "SIC": "46439",
    "description": "Wholesale of radio, television goods & electrical household appliances (other than records, tapes, CD's & video tapes and the equipment used for playing them)"
  },
  {
    "SIC": "46440",
    "description": "Wholesale of china and glassware and cleaning materials"
  },
  {
    "SIC": "46450",
    "description": "Wholesale of perfume and cosmetics"
  },
  {
    "SIC": "46460",
    "description": "Wholesale of pharmaceutical goods"
  },
  {
    "SIC": "46470",
    "description": "Wholesale of furniture, carpets and lighting equipment"
  },
  {
    "SIC": "46480",
    "description": "Wholesale of watches and jewellery"
  },
  {
    "SIC": "46491",
    "description": "Wholesale of musical instruments"
  },
  {
    "SIC": "46499",
    "description": "Wholesale of household goods (other than musical instruments) n.e.c."
  },
  {
    "SIC": "46510",
    "description": "Wholesale of computers, computer peripheral equipment and software"
  },
  {
    "SIC": "46520",
    "description": "Wholesale of electronic and telecommunications equipment and parts"
  },
  {
    "SIC": "46610",
    "description": "Wholesale of agricultural machinery, equipment and supplies"
  },
  {
    "SIC": "46620",
    "description": "Wholesale of machine tools"
  },
  {
    "SIC": "46630",
    "description": "Wholesale of mining, construction and civil engineering machinery"
  },
  {
    "SIC": "46640",
    "description": "Wholesale of machinery for the textile industry and of sewing and knitting machines"
  },
  {
    "SIC": "46650",
    "description": "Wholesale of office furniture"
  },
  {
    "SIC": "46660",
    "description": "Wholesale of other office machinery and equipment"
  },
  {
    "SIC": "46690",
    "description": "Wholesale of other machinery and equipment"
  },
  {
    "SIC": "46711",
    "description": "Wholesale of petroleum and petroleum products"
  },
  {
    "SIC": "46719",
    "description": "Wholesale of other fuels and related products"
  },
  {
    "SIC": "46720",
    "description": "Wholesale of metals and metal ores"
  },
  {
    "SIC": "46730",
    "description": "Wholesale of wood, construction materials and sanitary equipment"
  },
  {
    "SIC": "46740",
    "description": "Wholesale of hardware, plumbing and heating equipment and supplies"
  },
  {
    "SIC": "46750",
    "description": "Wholesale of chemical products"
  },
  {
    "SIC": "46760",
    "description": "Wholesale of other intermediate products"
  },
  {
    "SIC": "46770",
    "description": "Wholesale of waste and scrap"
  },
  {
    "SIC": "46900",
    "description": "Non-specialised wholesale trade"
  },
  {
    "SIC": "47110",
    "description": "Retail sale in non-specialised stores with food, beverages or tobacco predominating"
  },
  {
    "SIC": "47190",
    "description": "Other retail sale in non-specialised stores"
  },
  {
    "SIC": "47210",
    "description": "Retail sale of fruit and vegetables in specialised stores"
  },
  {
    "SIC": "47220",
    "description": "Retail sale of meat and meat products in specialised stores"
  },
  {
    "SIC": "47230",
    "description": "Retail sale of fish, crustaceans and molluscs in specialised stores"
  },
  {
    "SIC": "47240",
    "description": "Retail sale of bread, cakes, flour confectionery and sugar confectionery in specialised stores"
  },
  {
    "SIC": "47250",
    "description": "Retail sale of beverages in specialised stores"
  },
  {
    "SIC": "47260",
    "description": "Retail sale of tobacco products in specialised stores"
  },
  {
    "SIC": "47290",
    "description": "Other retail sale of food in specialised stores"
  },
  {
    "SIC": "47300",
    "description": "Retail sale of automotive fuel in specialised stores"
  },
  {
    "SIC": "47410",
    "description": "Retail sale of computers, peripheral units and software in specialised stores"
  },
  {
    "SIC": "47421",
    "description": "Retail sale of mobile telephones"
  },
  {
    "SIC": "47429",
    "description": "Retail sale of telecommunications equipment other than mobile telephones"
  },
  {
    "SIC": "47430",
    "description": "Retail sale of audio and video equipment in specialised stores"
  },
  {
    "SIC": "47510",
    "description": "Retail sale of textiles in specialised stores"
  },
  {
    "SIC": "47520",
    "description": "Retail sale of hardware, paints and glass in specialised stores"
  },
  {
    "SIC": "47530",
    "description": "Retail sale of carpets, rugs, wall and floor coverings in specialised stores"
  },
  {
    "SIC": "47540",
    "description": "Retail sale of electrical household appliances in specialised stores"
  },
  {
    "SIC": "47591",
    "description": "Retail sale of musical instruments and scores"
  },
  {
    "SIC": "47599",
    "description": "Retail of furniture, lighting, and similar (not musical instruments or scores) in specialised store"
  },
  {
    "SIC": "47610",
    "description": "Retail sale of books in specialised stores"
  },
  {
    "SIC": "47620",
    "description": "Retail sale of newspapers and stationery in specialised stores"
  },
  {
    "SIC": "47630",
    "description": "Retail sale of music and video recordings in specialised stores"
  },
  {
    "SIC": "47640",
    "description": "Retail sale of sports goods, fishing gear, camping goods, boats and bicycles"
  },
  {
    "SIC": "47650",
    "description": "Retail sale of games and toys in specialised stores"
  },
  {
    "SIC": "47710",
    "description": "Retail sale of clothing in specialised stores"
  },
  {
    "SIC": "47721",
    "description": "Retail sale of footwear in specialised stores"
  },
  {
    "SIC": "47722",
    "description": "Retail sale of leather goods in specialised stores"
  },
  {
    "SIC": "47730",
    "description": "Dispensing chemist in specialised stores"
  },
  {
    "SIC": "47741",
    "description": "Retail sale of hearing aids"
  },
  {
    "SIC": "47749",
    "description": "Retail sale of medical and orthopaedic goods in specialised stores (not incl. hearing aids) n.e.c."
  },
  {
    "SIC": "47750",
    "description": "Retail sale of cosmetic and toilet articles in specialised stores"
  },
  {
    "SIC": "47760",
    "description": "Retail sale of flowers, plants, seeds, fertilizers, pet animals and pet food in specialised stores"
  },
  {
    "SIC": "47770",
    "description": "Retail sale of watches and jewellery in specialised stores"
  },
  {
    "SIC": "47781",
    "description": "Retail sale in commercial art galleries"
  },
  {
    "SIC": "47782",
    "description": "Retail sale by opticians"
  },
  {
    "SIC": "47789",
    "description": "Other retail sale of new goods in specialised stores (not commercial art galleries and opticians)"
  },
  {
    "SIC": "47791",
    "description": "Retail sale of antiques including antique books in stores"
  },
  {
    "SIC": "47799",
    "description": "Retail sale of other second-hand goods in stores (not incl. antiques)"
  },
  {
    "SIC": "47810",
    "description": "Retail sale via stalls and markets of food, beverages and tobacco products"
  },
  {
    "SIC": "47820",
    "description": "Retail sale via stalls and markets of textiles, clothing and footwear"
  },
  {
    "SIC": "47890",
    "description": "Retail sale via stalls and markets of other goods"
  },
  {
    "SIC": "47910",
    "description": "Retail sale via mail order houses or via Internet"
  },
  {
    "SIC": "47990",
    "description": "Other retail sale not in stores, stalls or markets"
  },
  {
    "SIC": "49100",
    "description": "Passenger rail transport, interurban"
  },
  {
    "SIC": "49200",
    "description": "Freight rail transport"
  },
  {
    "SIC": "49311",
    "description": "Urban and suburban passenger railway transportation by underground, metro and similar systems"
  },
  {
    "SIC": "49319",
    "description": "Other urban, suburban or metropolitan passenger land transport (not underground, metro or similar)"
  },
  {
    "SIC": "49320",
    "description": "Taxi operation"
  },
  {
    "SIC": "49390",
    "description": "Other passenger land transport"
  },
  {
    "SIC": "49410",
    "description": "Freight transport by road"
  },
  {
    "SIC": "49420",
    "description": "Removal services"
  },
  {
    "SIC": "49500",
    "description": "Transport via pipeline"
  },
  {
    "SIC": "50100",
    "description": "Sea and coastal passenger water transport"
  },
  {
    "SIC": "50200",
    "description": "Sea and coastal freight water transport"
  },
  {
    "SIC": "50300",
    "description": "Inland passenger water transport"
  },
  {
    "SIC": "50400",
    "description": "Inland freight water transport"
  },
  {
    "SIC": "51101",
    "description": "Scheduled passenger air transport"
  },
  {
    "SIC": "51102",
    "description": "Non-scheduled passenger air transport"
  },
  {
    "SIC": "51210",
    "description": "Freight air transport"
  },
  {
    "SIC": "51220",
    "description": "Space transport"
  },
  {
    "SIC": "52101",
    "description": "Operation of warehousing and storage facilities for water transport activities"
  },
  {
    "SIC": "52102",
    "description": "Operation of warehousing and storage facilities for air transport activities"
  },
  {
    "SIC": "52103",
    "description": "Operation of warehousing and storage facilities for land transport activities"
  },
  {
    "SIC": "52211",
    "description": "Operation of rail freight terminals"
  },
  {
    "SIC": "52212",
    "description": "Operation of rail passenger facilities at railway stations"
  },
  {
    "SIC": "52213",
    "description": "Operation of bus and coach passenger facilities at bus and coach stations"
  },
  {
    "SIC": "52219",
    "description": "Other service activities incidental to land transportation, n.e.c."
  },
  {
    "SIC": "52220",
    "description": "Service activities incidental to water transportation"
  },
  {
    "SIC": "52230",
    "description": "Service activities incidental to air transportation"
  },
  {
    "SIC": "52241",
    "description": "Cargo handling for water transport activities"
  },
  {
    "SIC": "52242",
    "description": "Cargo handling for air transport activities"
  },
  {
    "SIC": "52243",
    "description": "Cargo handling for land transport activities"
  },
  {
    "SIC": "52290",
    "description": "Other transportation support activities"
  },
  {
    "SIC": "53100",
    "description": "Postal activities under universal service obligation"
  },
  {
    "SIC": "53201",
    "description": "Licensed carriers"
  },
  {
    "SIC": "53202",
    "description": "Unlicensed carrier"
  },
  {
    "SIC": "55100",
    "description": "Hotels and similar accommodation"
  },
  {
    "SIC": "55201",
    "description": "Holiday centres and villages"
  },
  {
    "SIC": "55202",
    "description": "Youth hostels"
  },
  {
    "SIC": "55209",
    "description": "Other holiday and other collective accommodation"
  },
  {
    "SIC": "55300",
    "description": "Recreational vehicle parks, trailer parks and camping grounds"
  },
  {
    "SIC": "55900",
    "description": "Other accommodation"
  },
  {
    "SIC": "56101",
    "description": "Licensed restaurants"
  },
  {
    "SIC": "56102",
    "description": "Unlicensed restaurants and cafes"
  },
  {
    "SIC": "56103",
    "description": "Take-away food shops and mobile food stands"
  },
  {
    "SIC": "56210",
    "description": "Event catering activities"
  },
  {
    "SIC": "56290",
    "description": "Other food services"
  },
  {
    "SIC": "56301",
    "description": "Licensed clubs"
  },
  {
    "SIC": "56302",
    "description": "Public houses and bars"
  },
  {
    "SIC": "58110",
    "description": "Book publishing"
  },
  {
    "SIC": "58120",
    "description": "Publishing of directories and mailing lists"
  },
  {
    "SIC": "58130",
    "description": "Publishing of newspapers"
  },
  {
    "SIC": "58141",
    "description": "Publishing of learned journals"
  },
  {
    "SIC": "58142",
    "description": "Publishing of consumer and business journals and periodicals"
  },
  {
    "SIC": "58190",
    "description": "Other publishing activities"
  },
  {
    "SIC": "58210",
    "description": "Publishing of computer games"
  },
  {
    "SIC": "58290",
    "description": "Other software publishing"
  },
  {
    "SIC": "59111",
    "description": "Motion picture production activities"
  },
  {
    "SIC": "59112",
    "description": "Video production activities"
  },
  {
    "SIC": "59113",
    "description": "Television programme production activities"
  },
  {
    "SIC": "59120",
    "description": "Motion picture, video and television programme post-production activities"
  },
  {
    "SIC": "59131",
    "description": "Motion picture distribution activities"
  },
  {
    "SIC": "59132",
    "description": "Video distribution activities"
  },
  {
    "SIC": "59133",
    "description": "Television programme distribution activities"
  },
  {
    "SIC": "59140",
    "description": "Motion picture projection activities"
  },
  {
    "SIC": "59200",
    "description": "Sound recording and music publishing activities"
  },
  {
    "SIC": "60100",
    "description": "Radio broadcasting"
  },
  {
    "SIC": "60200",
    "description": "Television programming and broadcasting activities"
  },
  {
    "SIC": "61100",
    "description": "Wired telecommunications activities"
  },
  {
    "SIC": "61200",
    "description": "Wireless telecommunications activities"
  },
  {
    "SIC": "61300",
    "description": "Satellite telecommunications activities"
  },
  {
    "SIC": "61900",
    "description": "Other telecommunications activities"
  },
  {
    "SIC": "62011",
    "description": "Ready-made interactive leisure and entertainment software development"
  },
  {
    "SIC": "62012",
    "description": "Business and domestic software development"
  },
  {
    "SIC": "62020",
    "description": "Information technology consultancy activities"
  },
  {
    "SIC": "62030",
    "description": "Computer facilities management activities"
  },
  {
    "SIC": "62090",
    "description": "Other information technology service activities"
  },
  {
    "SIC": "63110",
    "description": "Data processing, hosting and related activities"
  },
  {
    "SIC": "63120",
    "description": "Web portals"
  },
  {
    "SIC": "63910",
    "description": "News agency activities"
  },
  {
    "SIC": "63990",
    "description": "Other information service activities n.e.c."
  },
  {
    "SIC": "64110",
    "description": "Central banking"
  },
  {
    "SIC": "64191",
    "description": "Banks"
  },
  {
    "SIC": "64192",
    "description": "Building societies"
  },
  {
    "SIC": "64201",
    "description": "Activities of agricultural holding companies"
  },
  {
    "SIC": "64202",
    "description": "Activities of production holding companies"
  },
  {
    "SIC": "64203",
    "description": "Activities of construction holding companies"
  },
  {
    "SIC": "64204",
    "description": "Activities of distribution holding companies"
  },
  {
    "SIC": "64205",
    "description": "Activities of financial services holding companies"
  },
  {
    "SIC": "64209",
    "description": "Activities of other holding companies n.e.c."
  },
  {
    "SIC": "64301",
    "description": "Activities of investment trusts"
  },
  {
    "SIC": "64302",
    "description": "Activities of unit trusts"
  },
  {
    "SIC": "64303",
    "description": "Activities of venture and development capital companies"
  },
  {
    "SIC": "64304",
    "description": "Activities of open-ended investment companies"
  },
  {
    "SIC": "64305",
    "description": "Activities of property unit trusts"
  },
  {
    "SIC": "64306",
    "description": "Activities of real estate investment trusts"
  },
  {
    "SIC": "64910",
    "description": "Financial leasing"
  },
  {
    "SIC": "64921",
    "description": "Credit granting by non-deposit taking finance houses and other specialist consumer credit grantors"
  },
  {
    "SIC": "64922",
    "description": "Activities of mortgage finance companies"
  },
  {
    "SIC": "64929",
    "description": "Other credit granting n.e.c."
  },
  {
    "SIC": "64991",
    "description": "Security dealing on own account"
  },
  {
    "SIC": "64992",
    "description": "Factoring"
  },
  {
    "SIC": "64999",
    "description": "Financial intermediation not elsewhere classified"
  },
  {
    "SIC": "65110",
    "description": "Life insurance"
  },
  {
    "SIC": "65120",
    "description": "Non-life insurance"
  },
  {
    "SIC": "65201",
    "description": "Life reinsurance"
  },
  {
    "SIC": "65202",
    "description": "Non-life reinsurance"
  },
  {
    "SIC": "65300",
    "description": "Pension funding"
  },
  {
    "SIC": "66110",
    "description": "Administration of financial markets"
  },
  {
    "SIC": "66120",
    "description": "Security and commodity contracts dealing activities"
  },
  {
    "SIC": "66190",
    "description": "Activities auxiliary to financial intermediation n.e.c."
  },
  {
    "SIC": "66210",
    "description": "Risk and damage evaluation"
  },
  {
    "SIC": "66220",
    "description": "Activities of insurance agents and brokers"
  },
  {
    "SIC": "66290",
    "description": "Other activities auxiliary to insurance and pension funding"
  },
  {
    "SIC": "66300",
    "description": "Fund management activities"
  },
  {
    "SIC": "68100",
    "description": "Buying and selling of own real estate"
  },
  {
    "SIC": "68201",
    "description": "Renting and operating of Housing Association real estate"
  },
  {
    "SIC": "68202",
    "description": "Letting and operating of conference and exhibition centres"
  },
  {
    "SIC": "68209",
    "description": "Other letting and operating of own or leased real estate"
  },
  {
    "SIC": "68310",
    "description": "Real estate agencies"
  },
  {
    "SIC": "68320",
    "description": "Management of real estate on a fee or contract basis"
  },
  {
    "SIC": "69101",
    "description": "Barristers at law"
  },
  {
    "SIC": "69102",
    "description": "Solicitors"
  },
  {
    "SIC": "69109",
    "description": "Activities of patent and copyright agents; other legal activities n.e.c."
  },
  {
    "SIC": "69201",
    "description": "Accounting and auditing activities"
  },
  {
    "SIC": "69202",
    "description": "Bookkeeping activities"
  },
  {
    "SIC": "69203",
    "description": "Tax consultancy"
  },
  {
    "SIC": "70100",
    "description": "Activities of head offices"
  },
  {
    "SIC": "70210",
    "description": "Public relations and communications activities"
  },
  {
    "SIC": "70221",
    "description": "Financial management"
  },
  {
    "SIC": "70229",
    "description": "Management consultancy activities other than financial management"
  },
  {
    "SIC": "71111",
    "description": "Architectural activities"
  },
  {
    "SIC": "71112",
    "description": "Urban planning and landscape architectural activities"
  },
  {
    "SIC": "71121",
    "description": "Engineering design activities for industrial process and production"
  },
  {
    "SIC": "71122",
    "description": "Engineering related scientific and technical consulting activities"
  },
  {
    "SIC": "71129",
    "description": "Other engineering activities"
  },
  {
    "SIC": "71200",
    "description": "Technical testing and analysis"
  },
  {
    "SIC": "72110",
    "description": "Research and experimental development on biotechnology"
  },
  {
    "SIC": "72190",
    "description": "Other research and experimental development on natural sciences and engineering"
  },
  {
    "SIC": "72200",
    "description": "Research and experimental development on social sciences and humanities"
  },
  {
    "SIC": "73110",
    "description": "Advertising agencies"
  },
  {
    "SIC": "73120",
    "description": "Media representation services"
  },
  {
    "SIC": "73200",
    "description": "Market research and public opinion polling"
  },
  {
    "SIC": "74100",
    "description": "specialised design activities"
  },
  {
    "SIC": "74201",
    "description": "Portrait photographic activities"
  },
  {
    "SIC": "74202",
    "description": "Other specialist photography"
  },
  {
    "SIC": "74203",
    "description": "Film processing"
  },
  {
    "SIC": "74209",
    "description": "Photographic activities not elsewhere classified"
  },
  {
    "SIC": "74300",
    "description": "Translation and interpretation activities"
  },
  {
    "SIC": "74901",
    "description": "Environmental consulting activities"
  },
  {
    "SIC": "74902",
    "description": "Quantity surveying activities"
  },
  {
    "SIC": "74909",
    "description": "Other professional, scientific and technical activities n.e.c."
  },
  {
    "SIC": "74990",
    "description": "Non-trading company"
  },
  {
    "SIC": "75000",
    "description": "Veterinary activities"
  },
  {
    "SIC": "77110",
    "description": "Renting and leasing of cars and light motor vehicles"
  },
  {
    "SIC": "77120",
    "description": "Renting and leasing of trucks and other heavy vehicles"
  },
  {
    "SIC": "77210",
    "description": "Renting and leasing of recreational and sports goods"
  },
  {
    "SIC": "77220",
    "description": "Renting of video tapes and disks"
  },
  {
    "SIC": "77291",
    "description": "Renting and leasing of media entertainment equipment"
  },
  {
    "SIC": "77299",
    "description": "Renting and leasing of other personal and household goods"
  },
  {
    "SIC": "77310",
    "description": "Renting and leasing of agricultural machinery and equipment"
  },
  {
    "SIC": "77320",
    "description": "Renting and leasing of construction and civil engineering machinery and equipment"
  },
  {
    "SIC": "77330",
    "description": "Renting and leasing of office machinery and equipment (including computers)"
  },
  {
    "SIC": "77341",
    "description": "Renting and leasing of passenger water transport equipment"
  },
  {
    "SIC": "77342",
    "description": "Renting and leasing of freight water transport equipment"
  },
  {
    "SIC": "77351",
    "description": "Renting and leasing of air passenger transport equipment"
  },
  {
    "SIC": "77352",
    "description": "Renting and leasing of freight air transport equipment"
  },
  {
    "SIC": "77390",
    "description": "Renting and leasing of other machinery, equipment and tangible goods n.e.c."
  },
  {
    "SIC": "77400",
    "description": "Leasing of intellectual property and similar products, except copyright works"
  },
  {
    "SIC": "78101",
    "description": "Motion picture, television and other theatrical casting activities"
  },
  {
    "SIC": "78109",
    "description": "Other activities of employment placement agencies"
  },
  {
    "SIC": "78200",
    "description": "Temporary employment agency activities"
  },
  {
    "SIC": "78300",
    "description": "Human resources provision and management of human resources functions"
  },
  {
    "SIC": "79110",
    "description": "Travel agency activities"
  },
  {
    "SIC": "79120",
    "description": "Tour operator activities"
  },
  {
    "SIC": "79901",
    "description": "Activities of tourist guides"
  },
  {
    "SIC": "79909",
    "description": "Other reservation service activities n.e.c."
  },
  {
    "SIC": "80100",
    "description": "Private security activities"
  },
  {
    "SIC": "80200",
    "description": "Security systems service activities"
  },
  {
    "SIC": "80300",
    "description": "Investigation activities"
  },
  {
    "SIC": "81100",
    "description": "Combined facilities support activities"
  },
  {
    "SIC": "81210",
    "description": "General cleaning of buildings"
  },
  {
    "SIC": "81221",
    "description": "Window cleaning services"
  },
  {
    "SIC": "81222",
    "description": "Specialised cleaning services"
  },
  {
    "SIC": "81223",
    "description": "Furnace and chimney cleaning services"
  },
  {
    "SIC": "81229",
    "description": "Other building and industrial cleaning activities"
  },
  {
    "SIC": "81291",
    "description": "Disinfecting and exterminating services"
  },
  {
    "SIC": "81299",
    "description": "Other cleaning services"
  },
  {
    "SIC": "81300",
    "description": "Landscape service activities"
  },
  {
    "SIC": "82110",
    "description": "Combined office administrative service activities"
  },
  {
    "SIC": "82190",
    "description": "Photocopying, document preparation and other specialised office support activities"
  },
  {
    "SIC": "82200",
    "description": "Activities of call centres"
  },
  {
    "SIC": "82301",
    "description": "Activities of exhibition and fair organisers"
  },
  {
    "SIC": "82302",
    "description": "Activities of conference organisers"
  },
  {
    "SIC": "82911",
    "description": "Activities of collection agencies"
  },
  {
    "SIC": "82912",
    "description": "Activities of credit bureaus"
  },
  {
    "SIC": "82920",
    "description": "Packaging activities"
  },
  {
    "SIC": "82990",
    "description": "Other business support service activities n.e.c."
  },
  {
    "SIC": "84110",
    "description": "General public administration activities"
  },
  {
    "SIC": "84120",
    "description": "Regulation of health care, education, cultural and other social services, not incl. social security"
  },
  {
    "SIC": "84130",
    "description": "Regulation of and contribution to more efficient operation of businesses"
  },
  {
    "SIC": "84210",
    "description": "Foreign affairs"
  },
  {
    "SIC": "84220",
    "description": "Defence activities"
  },
  {
    "SIC": "84230",
    "description": "Justice and judicial activities"
  },
  {
    "SIC": "84240",
    "description": "Public order and safety activities"
  },
  {
    "SIC": "84250",
    "description": "Fire service activities"
  },
  {
    "SIC": "84300",
    "description": "Compulsory social security activities"
  },
  {
    "SIC": "85100",
    "description": "Pre-primary education"
  },
  {
    "SIC": "85200",
    "description": "Primary education"
  },
  {
    "SIC": "85310",
    "description": "General secondary education"
  },
  {
    "SIC": "85320",
    "description": "Technical and vocational secondary education"
  },
  {
    "SIC": "85410",
    "description": "Post-secondary non-tertiary education"
  },
  {
    "SIC": "85421",
    "description": "First-degree level higher education"
  },
  {
    "SIC": "85422",
    "description": "Post-graduate level higher education"
  },
  {
    "SIC": "85510",
    "description": "Sports and recreation education"
  },
  {
    "SIC": "85520",
    "description": "Cultural education"
  },
  {
    "SIC": "85530",
    "description": "Driving school activities"
  },
  {
    "SIC": "85590",
    "description": "Other education n.e.c."
  },
  {
    "SIC": "85600",
    "description": "Educational support services"
  },
  {
    "SIC": "86101",
    "description": "Hospital activities"
  },
  {
    "SIC": "86102",
    "description": "Medical nursing home activities"
  },
  {
    "SIC": "86210",
    "description": "General medical practice activities"
  },
  {
    "SIC": "86220",
    "description": "Specialists medical practice activities"
  },
  {
    "SIC": "86230",
    "description": "Dental practice activities"
  },
  {
    "SIC": "86900",
    "description": "Other human health activities"
  },
  {
    "SIC": "87100",
    "description": "Residential nursing care facilities"
  },
  {
    "SIC": "87200",
    "description": "Residential care activities for learning difficulties, mental health and substance abuse"
  },
  {
    "SIC": "87300",
    "description": "Residential care activities for the elderly and disabled"
  },
  {
    "SIC": "87900",
    "description": "Other residential care activities n.e.c."
  },
  {
    "SIC": "88100",
    "description": "Social work activities without accommodation for the elderly and disabled"
  },
  {
    "SIC": "88910",
    "description": "Child day-care activities"
  },
  {
    "SIC": "88990",
    "description": "Other social work activities without accommodation n.e.c."
  },
  {
    "SIC": "90010",
    "description": "Performing arts"
  },
  {
    "SIC": "90020",
    "description": "Support activities to performing arts"
  },
  {
    "SIC": "90030",
    "description": "Artistic creation"
  },
  {
    "SIC": "90040",
    "description": "Operation of arts facilities"
  },
  {
    "SIC": "91011",
    "description": "Library activities"
  },
  {
    "SIC": "91012",
    "description": "Archives activities"
  },
  {
    "SIC": "91020",
    "description": "Museums activities"
  },
  {
    "SIC": "91030",
    "description": "Operation of historical sites and buildings and similar visitor attractions"
  },
  {
    "SIC": "91040",
    "description": "Botanical and zoological gardens and nature reserves activities"
  },
  {
    "SIC": "92000",
    "description": "Gambling and betting activities"
  },
  {
    "SIC": "93110",
    "description": "Operation of sports facilities"
  },
  {
    "SIC": "93120",
    "description": "Activities of sport clubs"
  },
  {
    "SIC": "93130",
    "description": "Fitness facilities"
  },
  {
    "SIC": "93191",
    "description": "Activities of racehorse owners"
  },
  {
    "SIC": "93199",
    "description": "Other sports activities"
  },
  {
    "SIC": "93210",
    "description": "Activities of amusement parks and theme parks"
  },
  {
    "SIC": "93290",
    "description": "Other amusement and recreation activities n.e.c."
  },
  {
    "SIC": "94110",
    "description": "Activities of business and employers membership organizations"
  },
  {
    "SIC": "94120",
    "description": "Activities of professional membership organizations"
  },
  {
    "SIC": "94200",
    "description": "Activities of trade unions"
  },
  {
    "SIC": "94910",
    "description": "Activities of religious organizations"
  },
  {
    "SIC": "94920",
    "description": "Activities of political organizations"
  },
  {
    "SIC": "94990",
    "description": "Activities of other membership organizations n.e.c."
  },
  {
    "SIC": "95110",
    "description": "Repair of computers and peripheral equipment"
  },
  {
    "SIC": "95120",
    "description": "Repair of communication equipment"
  },
  {
    "SIC": "95210",
    "description": "Repair of consumer electronics"
  },
  {
    "SIC": "95220",
    "description": "Repair of household appliances and home and garden equipment"
  },
  {
    "SIC": "95230",
    "description": "Repair of footwear and leather goods"
  },
  {
    "SIC": "95240",
    "description": "Repair of furniture and home furnishings"
  },
  {
    "SIC": "95250",
    "description": "Repair of watches, clocks and jewellery"
  },
  {
    "SIC": "95290",
    "description": "Repair of personal and household goods n.e.c."
  },
  {
    "SIC": "96010",
    "description": "Washing and (dry-)cleaning of textile and fur products"
  },
  {
    "SIC": "96020",
    "description": "Hairdressing and other beauty treatment"
  },
  {
    "SIC": "96030",
    "description": "Funeral and related activities"
  },
  {
    "SIC": "96040",
    "description": "Physical well-being activities"
  },
  {
    "SIC": "96090",
    "description": "Other service activities n.e.c."
  },
  {
    "SIC": "97000",
    "description": "Activities of households as employers of domestic personnel"
  },
  {
    "SIC": "98000",
    "description": "Residents property management"
  },
  {
    "SIC": "98100",
    "description": "Undifferentiated goods-producing activities of private households for own use"
  },
  {
    "SIC": "98200",
    "description": "Undifferentiated service-producing activities of private households for own use"
  },
  {
    "SIC": "99000",
    "description": "Activities of extraterritorial organizations and bodies"
  },
  {
    "SIC": "99999",
    "description": "Dormant Company"
  }
]

export default sicList;