const games = [
    {
        title: "Battlefield 4 - Premium Edition",
        publisher: "DICE",
        genre: "6127b40949f80e08b4eead36",
        price: 39.99,
        numberInStock: 10,
        image: "/images/bf4.jpg",
        description: "Embrace unrivaled destruction in Battlefield 4™. Revel in the glorious chaos of all-out war packed with rewarding, tactical challenges in an interactive environment. Demolish the buildings shielding your enemy and lead an assault from the back of a gun boat. You have the freedom to do more and be more, playing to your strengths and carving your own path to victory. There is no comparison. Immerse yourself in the glorious chaos of all-out war.",
        minRequirements: "OS: Windows 8 32-bit_Processor: Processor (AMD): Athlon X2 2.8 GHz-Processor (Intel): Core 2 Duo 2.4 GHz_Memory: 4 GB RAM_Graphics: Graphics card (AMD): AMD Radeon HD 3870 Graphics card (NVIDIA): Nvidia GeForce 8800 GT_Network: Broadband Internet connection_Storage: 30 GB available space",
        recRequirements: "OS: Windows 8 64-bit_Processor: Processor (AMD): Six-core CPU Processor (Intel): Quad-core CPU_Memory: 8 GB RAM_Graphics: Graphics card (AMD): AMD Radeon HD 7870 Graphics card (Nvidia): NVIDIA GeForce GTX 660_Network: Broadband Internet connection_Storage: 30 GB available spaceBF4 rec"
    },
    {
        title: "Assassin's Creed IV: Black Flag",
        publisher: "Ubisoft",
        genre: "6127b3da99940e39545a771b",
        price: 19.99,
        numberInStock: 10,
        image: "/images/acbf.jpg",
        description: "The year is 1715. Pirates rule the Caribbean and have established their own lawless Republic where corruption, greediness and cruelty are commonplace.Among these outlaws is a brash young captain named Edward Kenway. His fight for glory has earned him the respect of legends like Blackbeard, but also drawn him into the ancient war between Assassins and Templars, a war that may destroy everything the pirates have built. Welcome to the Golden Age of Piracy.",
        minRequirements: "OS: Windows Vista SP2 or Windows 7 SP1 or Windows 8 (both 32/64bit versions)_Processor: Intel Core2Quad Q8400 @ 2.6 GHz or AMD Athlon II X4 620 @ 2.6 GHz_Memory: 2 GB RAM_Graphics: Nvidia Geforce GTX 260 or AMD Radeon HD 4870 (512MB VRAM with shader Model 4.0 or higher)_Storage: 30 GB available space_Sound Card: DirectX Compatible Sound Card with latest drivers",
        recRequirements: "OS: Windows Vista SP2 or Windows 7 SP1 or Windows 8 (both 32/64bit versions)_Processor: Intel Core i5 2400S @ 2.5 GHz or better or AMD Phenom II x4 940 @ 3.0 GHz_Memory: 4 GB RAM_Graphics: Nvidia GeForce GTX 470 or AMD Radeon HD 5850 (1024MB VRAM with Shader Model 5.0) or better_Storage: 30 GB available space_Sound Card: DirectX Compatible Sound Card with latest drivers"
    },
    {
        title: "Payday 2",
        publisher: "Starbreeze Publishing AB",
        genre: "6127b40949f80e08b4eead36",
        price: 9.99,
        numberInStock: 10,
        image: "/images/pd2.jpg",
        description: "PAYDAY 2 is an action-packed, four-player co-op shooter that once again lets gamers don the masks of the original PAYDAY crew - Dallas, Hoxton, Wolf and Chains - as they descend on Washington DC for an epic crime spree. \n The CRIMENET network offers a huge range of dynamic contracts, and players are free to choose anything from small-time convenience store hits or kidnappings, to big league cyber-crime or emptying out major bank vaults for that epic PAYDAY. While in DC, why not participate in the local community, and run a few political errands? \n Up to four friends co-operate on the hits, and as the crew progresses the jobs become bigger, better and more rewarding. Along with earning more money and becoming a legendary criminal comes a character customization and crafting system that lets crews build and customize their own guns and gear.",
        minRequirements: "OS: Windows 7_Processor: 2 GHz Intel Dual Core Processor_Memory: 4 GB RAM_Graphics: Nvidia & AMD (512MB VRAM)_DirectX®: 9.0c_Storage: 83 GB available space_Sound: DirectX 9.0c compatible",
        recRequirements: "OS: Windows 10_Processor: 2.3 GHz Intel Quad Core Processor_Memory: 8 GB RAM_Graphics: Nvidia & AMD (1GB VRAM)_DirectX®: 9.0c_Storage: 83 GB available space_Sound: DirectX 9.0c compatible"
    },
    {
        title: "Battlefield V - Definitive Edition",
        publisher: "DICE",
        genre: "6127b40949f80e08b4eead36",
        price: 59.99,
        numberInStock: 10,
        image: "/images/bf5.jpg",
        description: "The Battlefield series goes back to its roots in a never-before-seen portrayal of World War 2. Take on physical, all-out multiplayer with your squad in modes like the vast Grand Operations and the cooperative Combined Arms, or witness human drama set against global combat in the single player War Stories. As you fight in epic, unexpected locations across the globe, enjoy the richest and most immersive Battlefield yet. Now also includes Firestorm – Battle Royale, reimagined for Battlefield.",
        minRequirements: "OS: 64-bit Windows 7, Windows 8.1 and Windows 10_Processor: AMD FX-8350/ Core i5 6600K_Memory: 8 GB RAM_Graphics: NVIDIA GeForce® GTX 1050 / NVIDIA GeForce® GTX 660 2GB or AMD Radeon™ RX 560 / HD 7850 2GB_DirectX: Version 11_Storage: 50 GB available space",
        recRequirements: "OS: 64-bit Windows 10 or later_Processor: AMD Ryzen 3 1300X/Intel Core i7 4790_Memory: 12 GB RAM_Graphics: NVIDIA GeForce® GTX 1060 6GB/AMD Radeon™ RX 580 8GB_DirectX: Version 11_Storage: 50 GB available space"
    },
    {
        title: "Company of Heroes 2",
        publisher: "SEGA",
        genre: "6127b3da99940e39545a771d",
        price: 19.99,
        numberInStock: 10,
        image: "/images/coh2.jpg",
        description: "Powered by the Essence Engine 3.0, the Company of Heroes 2 series feature some unique mechanics rewarding thoughtful players. From the TrueSight™ system that emulates the units’ line of sight to the cover-system that encourages clever unit placement – not to mention the combined arms approach and the hard and soft counters gameplay that will make you think twice before trying to destroy a tank with a simple squad of riflemen – each game presents players with an uninterrupted stream of meaningful tactical choices that can turn the tide of war.",
        minRequirements: "Memory: 2GB RAM_Processor: 2Ghz Intel Core2 Duo or equivalent_Graphics: 512MB Direct3D 10 capable video card (GeForce 8800 GT or Radeon HD 2900XT)_OS: 32bit Vista_Internet: Broadband Internet connection_Hard Drive: 30GB free Hard disc space",
        recRequirements: "Memory: 4GB RAM_Processor: 3Ghz Intel i5 quad core or equivalent_Graphics: 1024 MB Direct3D 11 capable video card (GeForce GTX 470 or Radeon HD 5850)_OS: 64bit Windows 7 and above_Internet: Broadband Internet connection_Hard Drive: 30GB free Hard disc space"
    },
    {
        title: "Borderlands 3",
        publisher: "2K",
        genre: "6129827203e30b07f06923cc",
        price: 19.99,
        numberInStock: 10,
        image: "/images/borderlands3.jpg",
        description: "The original shooter-looter returns, packing bazillions of guns and an all-new mayhem-fueled adventure! Blast through new worlds and enemies as one of four brand new Vault Hunters – the ultimate treasure-seeking badasses of the Borderlands, each with deep skill trees, abilities, and customization. Play solo or join with friends to take on insane enemies, score loads of loot and save your home from the most ruthless cult leaders in the galaxy.",
        minRequirements: "OS: Windows 7/10 (latest service pack)_Processor: AMD FX-8350 or Intel i5-3570_Memory: 6 GB RAM_Graphics: AMD Radeon™ HD 7970 or NVIDIA GeForce GTX 680 2 GB_DirectX: Version 11_Storage: 75 GB available space_Sound Card: DirectX Compatible",
        recRequirements: "OS: Windows 7/10 (latest service pack)_Processor: AMD Ryzen™ 5 2600 (Intel i7-4770)_Memory: 16 GB RAM_Graphics: AMD Radeon™ RX 590 or NVIDIA GeForce GTX 1060 6GB_DirectX: Version 12_Storage: 75 GB available space_Sound Card: DirectX Compatible"
    },
    {
        title: "HUMANKIND™",
        publisher: "SEGA",
        genre: "6127b3da99940e39545a771d",
        price: 49.99,
        numberInStock: 10,
        image: "/images/humankind.jpg",
        description: "HUMANKIND™ is a historical strategy game, where you’ll be re-writing the entire narrative of human history and combining cultures to create a civilization that’s as unique as you are.",
        minRequirements: "OS: Windows 7, 64-bit_Processor: Intel i5 4th generation / AMD FX-8300_Memory: 8 GB RAM_Graphics: NVIDIA GTX 770 / AMD R9 290_DirectX: Version 11_Storage: 25 GB available space",
        recRequirements: "OS: Windows 7, 64-bit_Processor: Intel i5 6th generation (or better) / AMD Ryzen 5 1600 (or better)_Memory: 8 GB RAM_Graphics: NVIDIA GTX 1060 (or better) / AMD RX 5500-XT (or better)_DirectX: Version 11_Storage: 25 GB available space"
    },
    {
        title: "Cyberpunk 2077",
        publisher: "CD PROJEKT RED",
        genre: "6129827203e30b07f06923cc",
        price: 59.99,
        numberInStock: 10,
        image: "/images/cyberpunk2077.jpg",
        description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.",
        minRequirements: "OS: Windows 7 or 10_Processor: Intel Core i5-3570K or AMD FX-8310_Memory: 8 GB RAM_Graphics: NVIDIA GeForce GTX 780 or AMD Radeon RX 470_DirectX: Version 12_Storage: 70 GB available space",
        recRequirements: "OS: Windows 10_Processor: Intel Core i7-4790 or AMD Ryzen 3 3200G_Memory: 12 GB RAM_Graphics: GTX 1060 6GB / GTX 1660 Super or Radeon RX 590_DirectX: Version 12_Storage: 70 GB available space_Additional Notes: SSD recommended"
    },
    {
        title: "NBA 2K21",
        publisher: "2K",
        genre: "6127b3da99940e39545a771e",
        price: 59.99,
        numberInStock: 10,
        image: "/images/nba2k21.jpg",
        description: "NBA 2K21 is the latest release in the world-renowned, best-selling NBA 2K series. With exciting improvements upon its best-in-class gameplay, competitive and community online features, and deep, varied game modes, NBA 2K21 offers one-of-a-kind immersion into all facets of NBA basketball and culture - where Everything is Game. In NBA 2K21, new, old, and returning ballers alike will find exciting game modes that offer a variety of basketball experiences.",
        minRequirements: "OS: Windows 7 64-bit, Windows 8.1 64-bit or Windows 10 64-bit_Processor: Intel® Core™ i3-2100 @ 3.10 GHz / AMD FX-4100 @ 3.60 GHz or better_Memory: 4 GB RAM_Graphics: NVIDIA® GeForce® GT 450 1GB / ATI® Radeon™ HD 7770 1GB or better_DirectX: Version 11_Network: Broadband Internet connection_Storage: 110 GB available space_Sound Card: Directx 9.0x",
        recRequirements: "OS: Windows 7 64-bit, Windows 8.1 64-bit or Windows 10 64-bit_Processor: Intel® Core™ i5-4430 @ 3 GHz / AMD FX-8370 @ 3.4 GHz or better_Memory: 8 GB RAM_Graphics: NVIDIA® GeForce® GTX 770 2GB / ATI® Radeon™ R9 270 2GB or better_DirectX: Version 11_Network: Broadband Internet connection_Storage: 110 GB available space_Sound Card: Directx 9.0c"
    },
    {
        title: "Call of Duty: Modern Warfare",
        publisher: "Activision",
        genre: "6127b40949f80e08b4eead36",
        price: 59.99,
        numberInStock: 10,
        image: "/images/codmw.jpg",
        description: "The stakes have never been higher as players take on the role of lethal Tier One operators in a heart-racing saga that will affect the global balance of power. Developed by the studio that started it all, Infinity Ward delivers an epic reimagining of the iconic Modern Warfare series from the ground up.",
        minRequirements: "Os: Windows 10 64-bit (v.1709 or higher)_CPU: Intel Core i3-4340 or AMD FX-6300_RAM: 8GB RAM_HDD: 246GB HD space_Video: NVIDIA GeForce GTX 670 / GeForce GTX 1650 or Radeon HD 7950_DirectX: Requires DirectX 12 compatible system_Network: Broadband Internet connection_Sound Card: DirectX Compatible",
        recRequirements: "OS: Windows 10 64-bit (latest update)_CPU: Intel Core i5-2500K or AMD Ryzen R5 1600X processor_RAM: 12GB RAM_HDD: 246GB HD space_Video: NVIDIA GeForce GTX 970 / GTX 1660 or Radeon R9 390 / AMD RX 580_DirectX: Requires DirectX 12 compatible system_Network: Broadband Internet connection_Sound Card: DirectX Compatible"
    },
    {
        title: "Red Dead Redemption 2",
        publisher: "Rockstar Games",
        genre: "6127b3da99940e39545a7717",
        price: 59.99,
        numberInStock: 10,
        image: "/images/rdr2.jpg",
        description: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him. Now featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter, create a business as a Trader, unearth exotic treasures as a Collector or run an underground distillery as a Moonshiner and much more.",
        minRequirements: "OS: Windows 7 64-bit, Windows 8.1 64-bit or Windows 10 64-bit_Processor: Intel® Core™ i3-2100 @ 3.10 GHz / AMD FX-4100 @ 3.60 GHz or better_Memory: 4 GB RAM_Graphics: NVIDIA® GeForce® GT 450 1GB / ATI® Radeon™ HD 7770 1GB or better_DirectX: Version 11_Network: Broadband Internet connection_Storage: 110 GB available space_Sound Card: Directx 9.0x",
        recRequirements: "OS: Windows 7 64-bit, Windows 8.1 64-bit or Windows 10 64-bit_Processor: Intel® Core™ i5-4430 @ 3 GHz / AMD FX-8370 @ 3.4 GHz or better_Memory: 8 GB RAM_Graphics: NVIDIA® GeForce® GTX 770 2GB / ATI® Radeon™ R9 270 2GB or better_DirectX: Version 11_Network: Broadband Internet connection_Storage: 110 GB available space_Sound Card: Directx 9.0c"
    },
]

export default games