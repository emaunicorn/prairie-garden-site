/**
 * Prairie Garden Plant Database
 * Contains information about all 33 plant species in the garden
 */

const plantsDatabase = {
  'AC': {
    code: 'AC',
    commonName: 'Lead plant',
    scientificName: 'Amorpha canescens',
    genus: 'Amorpha',
    species: 'canescens',
    spacing: '2-3 ft',
    height: '2-3 ft',
    count: 7,
    category: 'Plant',
    description: 'A nitrogen-fixing shrub with silvery-gray foliage and unique flower spikes, popular in prairie restorations.'
  },
  'AM': {
    code: 'AM',
    commonName: 'Aronia Cherry',
    scientificName: 'Aronia melanocarpa',
    genus: 'Aronia',
    species: 'melanocarpa',
    spacing: '3-6 ft',
    height: '3-10 ft',
    count: 14,
    category: 'Plant',
    description: 'A native shrub producing clusters of edible dark purple berries and brilliant red fall foliage.'
  },
  'AT': {
    code: 'AT',
    commonName: 'Butterflyweed',
    scientificName: 'Asclepias tuberosa',
    genus: 'Asclepias',
    species: 'tuberosa',
    spacing: '1-3 ft',
    height: '2 ft',
    count: 80,
    category: 'Plant',
    description: 'A native host plant for monarch butterflies with vibrant orange flowers blooming mid-summer.'
  },
  'BB': {
    code: 'BB',
    commonName: 'Bird bath',
    scientificName: 'Bird Bath',
    genus: 'NA',
    species: 'NA',
    spacing: '5-6 ft',
    height: 'Varies',
    count: 1,
    category: 'Feature',
    description: 'Garden feature providing water for birds and other wildlife.'
  },
  'BBS': {
    code: 'BBS',
    commonName: 'Big Blue Stem',
    scientificName: 'Andropogon gerardii',
    genus: 'Andropogon',
    species: 'gerardii',
    spacing: '2-3 ft',
    height: '7 ft',
    count: 28,
    category: 'Plant',
    description: 'A dominant wild grass in native prairies, turning reddish-purple in fall. Can reach 7 feet tall.'
  },
  'BES': {
    code: 'BES',
    commonName: 'Black Eyed Susans',
    scientificName: 'Rudbeckia hirta',
    genus: 'Rudbeckia',
    species: 'hirta',
    spacing: '1 ft',
    height: '2 ft',
    count: 50,
    category: 'Plant',
    description: 'Cheerful native wildflowers with golden-yellow petals and dark brown centers, blooming summer through fall.'
  },
  'BF': {
    code: 'BF',
    commonName: 'Blue False Indigo',
    scientificName: 'Baptisia australis',
    genus: 'Baptisia',
    species: 'australis',
    spacing: '2-3 ft',
    height: '4 ft',
    count: 19,
    category: 'Plant',
    description: 'A tall native wildflower with spikes of blue pea-like flowers blooming in late spring.'
  },
  'BN': {
    code: 'BN',
    commonName: 'Common Boneset',
    scientificName: 'Eupatorium perfoliatum',
    genus: 'Eupatorium',
    species: 'perfoliatum',
    spacing: '1-2 ft',
    height: '4 ft',
    count: 45,
    category: 'Plant',
    description: 'A native perennial traditionally used for herbal remedies, with white flower clusters.'
  },
  'BS': {
    code: 'BS',
    commonName: 'Rough Blazing Star',
    scientificName: 'Liatris aspera',
    genus: 'Liatris',
    species: 'aspera',
    spacing: '0.5-1 ft',
    height: '2-3 ft',
    count: 226,
    category: 'Plant',
    description: 'Native wildflower with tall spikes of bright purple flowers, attractive to butterflies and bees.'
  },
  'BST': {
    code: 'BST',
    commonName: 'Bluestar',
    scientificName: 'Amsonia tabernaemontana',
    genus: 'Amsonia',
    species: 'tabernaemontana',
    spacing: '1-2 ft',
    height: '2-3 ft',
    count: 59,
    category: 'Plant',
    description: 'Native perennial with pale blue star-shaped flowers and fine foliage turning golden in fall.'
  },
  'BV': {
    code: 'BV',
    commonName: 'Blue Vervain',
    scientificName: 'Verbena hastata',
    genus: 'Verbena',
    species: 'hastata',
    spacing: '1.5-2 ft',
    height: '5 ft',
    count: 26,
    category: 'Plant',
    description: 'Tall native wildflower with slender spikes of blue-purple flowers blooming mid to late summer.'
  },
  'CB': {
    code: 'CB',
    commonName: 'Wild Columbine',
    scientificName: 'Aquilegia canadensis',
    genus: 'Aquilegia',
    species: 'canadensis',
    spacing: '1 ft',
    height: '1-3 ft',
    count: 69,
    category: 'Plant',
    description: 'Delicate native wildflower with red and yellow nodding flowers, hummingbird favorite.'
  },
  'FS': {
    code: 'FS',
    commonName: 'False Sunflower',
    scientificName: 'Heliopsis helianthoides',
    genus: 'Heliopsis',
    species: 'helianthoides',
    spacing: '1.5-3 ft',
    height: '5 ft',
    count: 12,
    category: 'Plant',
    description: 'Native wildflower resembling sunflowers with yellow blooms on tall plants, drought tolerant.'
  },
  'FV': {
    code: 'FV',
    commonName: 'Wild Strawberry',
    scientificName: 'Fragaria virginiana',
    genus: 'Fragaria',
    species: 'virginiana',
    spacing: '1 ft',
    height: '0.25-0.5 ft',
    count: 21,
    category: 'Plant',
    description: 'Native ground cover with small white flowers and tiny edible strawberries.'
  },
  'GR': {
    code: 'GR',
    commonName: 'Showy Goldenrod',
    scientificName: 'Solidago speciosa',
    genus: 'Solidago',
    species: 'speciosa',
    spacing: '2-3 ft',
    height: '5 ft',
    count: 30,
    category: 'Plant',
    description: 'A spectacular native wildflower with dense golden-yellow flower clusters, often blooming in late summer.'
  },
  'JP': {
    code: 'JP',
    commonName: 'Spotted Joe Pye Weed',
    scientificName: 'Eutrochium maculatum',
    genus: 'Eutrochium',
    species: 'maculatum',
    spacing: '3-4 ft',
    height: '5 ft',
    count: 12,
    category: 'Plant',
    description: 'Tall native wildflower with large purple flower clusters and distinctive spotted stems.'
  },
  'MF': {
    code: 'MF',
    commonName: 'Wild Bergamot',
    scientificName: 'Monarda fistulosa',
    genus: 'Monarda',
    species: 'fistulosa',
    spacing: '2-3 ft',
    height: '4 ft',
    count: 10,
    category: 'Plant',
    description: 'Aromatic native wildflower with lavender-pink flowers, attracts pollinators.'
  },
  'MI': {
    code: 'MI',
    commonName: 'Missouri Ironweed',
    scientificName: 'Vernonia missurica',
    genus: 'Vernonia',
    species: 'missurica',
    spacing: '2-3 ft',
    height: '5 ft',
    count: 12,
    category: 'Plant',
    description: 'Tall native wildflower with deep purple flowers and dark stems.'
  },
  'MM': {
    code: 'MM',
    commonName: 'Mountain Mint',
    scientificName: 'Pycnanthemum virginianum',
    genus: 'Pycnanthemum',
    species: 'virginianum',
    spacing: '1-1.5 ft',
    height: '3 ft',
    count: 39,
    category: 'Plant',
    description: 'Aromatic native mint with small pink and purple flowers, attracts bees and butterflies.'
  },
  'NJ': {
    code: 'NJ',
    commonName: 'New Jersey Tea',
    scientificName: 'Ceanothus americanus',
    genus: 'Ceanothus',
    species: 'americanus',
    spacing: '1.5-3 ft',
    height: '3 ft',
    count: 36,
    category: 'Plant',
    description: 'Low native shrub with white flower clusters blooming in early summer, historically used for tea.'
  },
  'OP': {
    code: 'OP',
    commonName: 'Obedient Plant',
    scientificName: 'Physostegia virginiana',
    genus: 'Physostegia',
    species: 'virginiana',
    spacing: '1-2 ft',
    height: '4 ft',
    count: 67,
    category: 'Plant',
    description: 'Native wildflower with pink or purple flowers that move when pushed, named for this habit.'
  },
  'OS': {
    code: 'OS',
    commonName: 'Ohio Spiderwort',
    scientificName: 'Tradescantia ohiensis',
    genus: 'Tradescantia',
    species: 'ohiensis',
    spacing: '1-1.5 ft',
    height: '3 ft',
    count: 35,
    category: 'Plant',
    description: 'Native wildflower with blue or purple three-petaled flowers blooming in spring and early summer.'
  },
  'PC': {
    code: 'PC',
    commonName: 'Purple Coneflower',
    scientificName: 'Echinacea purpurea',
    genus: 'Echinacea',
    species: 'purpurea',
    spacing: '1.5-2 ft',
    height: '4 ft',
    count: 25,
    category: 'Plant',
    description: 'Popular native wildflower with purple petals surrounding orange spiky center cones.'
  },
  'PD': {
    code: 'PD',
    commonName: 'Prairie Dropseed',
    scientificName: 'Sporobolus heterolepis',
    genus: 'Sporobolus',
    species: 'heterolepis',
    spacing: '2-3 ft',
    height: '2 ft',
    count: 17,
    category: 'Plant',
    description: 'Fine-textured native prairie grass turning copper-red in late summer and fall.'
  },
  'PP': {
    code: 'PP',
    commonName: 'Pawpaw',
    scientificName: 'Asimina triloba',
    genus: 'Asimina',
    species: 'triloba',
    spacing: '5 ft',
    height: '15-30 ft',
    count: 5,
    category: 'Plant',
    description: 'Native understory tree with dark purple flowers and exotic-looking tropical fruits.'
  },
  'RM': {
    code: 'RM',
    commonName: 'Rattlesnake Master',
    scientificName: 'Eryngium yuccifolium',
    genus: 'Eryngium',
    species: 'yuccifolium',
    spacing: '1.5-2 ft',
    height: '4 ft',
    count: 24,
    category: 'Plant',
    description: 'Native wildflower with gray-white spiky flowers and yucca-like foliage.'
  },
  'SB': {
    code: 'SB',
    commonName: 'Downy Service Berry',
    scientificName: 'Amelanchier arborea',
    genus: 'Amelanchier',
    species: 'arborea',
    spacing: '4 ft',
    height: '25 ft',
    count: 6,
    category: 'Plant',
    description: 'Native understory tree with white spring flowers, edible berries, and brilliant fall color.'
  },
  'SBA': {
    code: 'SBA',
    commonName: 'Smooth Blue Aster',
    scientificName: 'Symphyotrichum laeve',
    genus: 'Symphyotrichum',
    species: 'laeve',
    spacing: '1.5-2 ft',
    height: '4 ft',
    count: 38,
    category: 'Plant',
    description: 'Native wildflower with blue or purple daisy-like flowers blooming in fall.'
  },
  'SG': {
    code: 'SG',
    commonName: 'Switchgrass',
    scientificName: 'Panicum virgatum',
    genus: 'Panicum',
    species: 'virgatum',
    spacing: '2-4 ft',
    height: '4 ft',
    count: 19,
    category: 'Plant',
    description: 'Tall native prairie grass turning reddish-orange in fall, highly ornamental and drought tolerant.'
  },
  'WH': {
    code: 'WH',
    commonName: 'Witch Hazel',
    scientificName: 'Hamamelis virginiana',
    genus: 'Hamamelis',
    species: 'virginiana',
    spacing: '8-10 ft',
    height: '15-20 ft',
    count: 1,
    category: 'Plant',
    description: 'Native understory tree famous for blooming in late fall with fragrant yellow flowers.'
  },
  'WM': {
    code: 'WM',
    commonName: 'Whorled Milkweed',
    scientificName: 'Asclepias verticillata',
    genus: 'Asclepias',
    species: 'verticillata',
    spacing: '1-2 ft',
    height: '2 ft',
    count: 40,
    category: 'Plant',
    description: 'Native host plant for monarch butterflies with tiny white flowers and needle-like foliage.'
  },
  'WP': {
    code: 'WP',
    commonName: 'Wild Petunia',
    scientificName: 'Ruellia humilis',
    genus: 'Ruellia',
    species: 'humilis',
    spacing: '1 ft',
    height: '1 ft',
    count: 28,
    category: 'Plant',
    description: 'Low-growing native wildflower with purple trumpet-shaped flowers.'
  },
  'YC': {
    code: 'YC',
    commonName: 'Yellow Coneflower',
    scientificName: 'Ratibida pinnata',
    genus: 'Ratibida',
    species: 'pinnata',
    spacing: '1.5 ft',
    height: '3-6 ft',
    count: 31,
    category: 'Plant',
    description: 'Native wildflower with distinctive drooping yellow petals and prominent central cone.'
  }
};

/**
 * Get plant information by code
 * @param {string} code - Plant code (e.g., 'PC', 'GR')
 * @returns {object} Plant object with all properties or null if not found
 */
function getPlantByCode(code) {
  return plantsDatabase[code] || null;
}

/**
 * Get all plant codes
 * @returns {array} Array of all plant codes
 */
function getAllPlantCodes() {
  return Object.keys(plantsDatabase);
}

/**
 * Get all plants
 * @returns {object} All plants database object
 */
function getAllPlants() {
  return plantsDatabase;
}

/**
 * Summary statistics
 */
const plantStats = {
  totalSpecies: 33,
  totalCount: 1131,
  plantCategories: ['Plant', 'Feature']
};
