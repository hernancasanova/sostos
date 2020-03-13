import {
  ATTENDEES_ADD,
  ATTENDEES_DELETE,
  ATTENDEES_EDIT,
  ATTENDEES_ADD_FROM_XLXS
} from '../actiontypes/attendees';

const INITIAL_STATE = [
  {
    id: 1,
    firstName: 'Elsie Patrice',
    lastName: 'Burch Rivera',
    email: 'patricerivera@imaginart.com',
    enrollment: '85ed8d42-732b-49a7-8f5f-e55be5810021',
    rut: '20602455-0',
    institution: 9
  },
  {
    id: 2,
    firstName: 'Verna Boone',
    lastName: 'Kent Everett',
    email: 'booneeverett@imaginart.com',
    enrollment: '0bfd2092-8984-4fe2-8cbc-b303ac1169a6',
    rut: '19.842.944',
    institution: 10
  },
  {
    id: 3,
    firstName: 'Lilly Christensen',
    lastName: 'Ramirez Downs',
    email: 'christensendowns@imaginart.com',
    enrollment: 'afc4c353-e8b8-46ad-b903-2e66d2799c67',
    rut: '9.445.241',
    institution: 9
  },
  {
    id: 4,
    firstName: 'Baird Lamb',
    lastName: 'Franco Medina',
    email: 'lambmedina@imaginart.com',
    enrollment: '2159c34a-5b3f-49c4-9680-c541624865c3',
    rut: '8.738.331',
    institution: 4
  },
  {
    id: 5,
    firstName: 'Diane Middleton',
    lastName: 'Alvarado Newton',
    email: 'middletonnewton@imaginart.com',
    enrollment: '3e9e11b4-56df-4142-9922-eb4f5d4d7669',
    rut: '14.988.674',
    institution: 8
  },
  {
    id: 6,
    firstName: 'Karyn Becky',
    lastName: 'Berry Ochoa',
    email: 'beckyochoa@imaginart.com',
    enrollment: '5463d2d9-5df5-4261-974c-aaddc965ef93',
    rut: '3.840.409',
    institution: 6
  },
  {
    id: 7,
    firstName: 'Parker Ines',
    lastName: 'Cantu Sanford',
    email: 'inessanford@imaginart.com',
    enrollment: 'c6f0f141-c343-4217-860b-5d5dfa8f7b04',
    rut: '19.652.400',
    institution: 1
  },
  {
    id: 8,
    firstName: 'Gloria Cohen',
    lastName: 'Moran Travis',
    email: 'cohentravis@imaginart.com',
    enrollment: '4b0732f9-68b6-437e-b146-5994a7129e35',
    rut: '17.529.636',
    institution: 5
  },
  {
    id: 9,
    firstName: 'Jeannine Gay',
    lastName: 'Park Mosley',
    email: 'gaymosley@imaginart.com',
    enrollment: 'e35a0a28-0a1f-45f1-9913-d59b9003fb08',
    rut: '1.242.292',
    institution: 9
  },
  {
    id: 10,
    firstName: 'Silvia Preston',
    lastName: 'Frye Case',
    email: 'prestoncase@imaginart.com',
    enrollment: 'bbf27129-c415-4222-8a95-109e930be9a0',
    rut: '2.440.243',
    institution: 6
  },
  {
    id: 11,
    firstName: 'Eloise Henson',
    lastName: 'Benton Manning',
    email: 'hensonmanning@imaginart.com',
    enrollment: 'f941b2b3-a6a7-4600-93bb-1c6fea303346',
    rut: '19.459.839',
    institution: 7
  },
  {
    id: 12,
    firstName: 'Lara Sonia',
    lastName: 'Boyd Mcconnell',
    email: 'soniamcconnell@imaginart.com',
    enrollment: '319e7a80-3931-4483-9162-357761bb9d2f',
    rut: '11.502.852',
    institution: 9
  },
  {
    id: 13,
    firstName: 'Robles Oconnor',
    lastName: 'Stein Bradley',
    email: 'oconnorbradley@imaginart.com',
    enrollment: '80a899be-c17e-4d9a-b0ce-d152f1dfd01d',
    rut: '14.816.971',
    institution: 9
  },
  {
    id: 14,
    firstName: 'Hull Lou',
    lastName: 'Zimmerman Becker',
    email: 'loubecker@imaginart.com',
    enrollment: '97e251bb-842b-4e70-912e-ffe1be5ff30b',
    rut: '13.933.836',
    institution: 1
  },
  {
    id: 15,
    firstName: 'Diann Bush',
    lastName: 'Goff Flowers',
    email: 'bushflowers@imaginart.com',
    enrollment: 'bf5d493a-9f75-47cc-901d-fc810e057797',
    rut: '18.712.127',
    institution: 7
  },
  {
    id: 16,
    firstName: 'Karin Maritza',
    lastName: 'Alexander Fry',
    email: 'maritzafry@imaginart.com',
    enrollment: '84e8c87b-92a8-4a52-8ffa-17bd8c738935',
    rut: '10.776.164',
    institution: 4
  },
  {
    id: 17,
    firstName: 'Ester Gena',
    lastName: 'Hurst Mathews',
    email: 'genamathews@imaginart.com',
    enrollment: '3d3ee6e4-50b8-4e8d-9d40-20169c260049',
    rut: '1.349.938',
    institution: 8
  },
  {
    id: 18,
    firstName: 'Webb Good',
    lastName: 'Charles Lopez',
    email: 'goodlopez@imaginart.com',
    enrollment: '7c4ef19c-4fc3-46a0-bf62-d2364f211075',
    rut: '12.736.216',
    institution: 1
  },
  {
    id: 19,
    firstName: 'Lelia Booker',
    lastName: 'Cain Lowery',
    email: 'bookerlowery@imaginart.com',
    enrollment: 'daa0e0c5-b985-4dbe-a40f-90ecfbe303cb',
    rut: '4.954.126',
    institution: 6
  },
  {
    id: 20,
    firstName: 'Debora Albert',
    lastName: 'Marsh Gaines',
    email: 'albertgaines@imaginart.com',
    enrollment: '8dab8a9c-01e3-449b-8333-af859f919ecc',
    rut: '2.302.676',
    institution: 4
  },
  {
    id: 21,
    firstName: 'Kemp Lindsey',
    lastName: 'Crane Stokes',
    email: 'lindseystokes@imaginart.com',
    enrollment: '4a426f95-bf1c-4604-91d7-2d2d18df0532',
    rut: '3.903.646',
    institution: 9
  },
  {
    id: 22,
    firstName: 'Edna Gallagher',
    lastName: 'Glenn Davenport',
    email: 'gallagherdavenport@imaginart.com',
    enrollment: '57d6c1cd-0196-42a6-9abb-f8fa8dc1e9b9',
    rut: '13.695.797',
    institution: 2
  },
  {
    id: 23,
    firstName: 'Spence Hatfield',
    lastName: 'Perkins Watkins',
    email: 'hatfieldwatkins@imaginart.com',
    enrollment: '9542ac36-a49d-42b5-9afe-4d600249f1c1',
    rut: '5.311.458',
    institution: 2
  },
  {
    id: 24,
    firstName: 'Angela Tami',
    lastName: 'Hooper Reed',
    email: 'tamireed@imaginart.com',
    enrollment: '3e1d73a6-88b3-4bdf-9b76-d27ee09dfa1c',
    rut: '19.577.918',
    institution: 10
  },
  {
    id: 25,
    firstName: 'Lila Craig',
    lastName: 'Miranda Nguyen',
    email: 'craignguyen@imaginart.com',
    enrollment: 'cd671be9-47ae-411e-b814-05a819dd8d65',
    rut: '3.160.357',
    institution: 3
  },
  {
    id: 26,
    firstName: 'Washington Stanton',
    lastName: 'Johnson Wolfe',
    email: 'stantonwolfe@imaginart.com',
    enrollment: 'e51b7f4e-4c84-43ef-9949-9fe7746c65c7',
    rut: '19.444.949',
    institution: 2
  },
  {
    id: 27,
    firstName: 'Carrillo Browning',
    lastName: 'Bond Calhoun',
    email: 'browningcalhoun@imaginart.com',
    enrollment: '478abcbb-7ff0-41be-863c-567f2cc475b0',
    rut: '19.785.775',
    institution: 1
  },
  {
    id: 28,
    firstName: 'Dixie Chapman',
    lastName: 'Sharpe Fulton',
    email: 'chapmanfulton@imaginart.com',
    enrollment: 'd762382f-f7f4-4832-93b2-e3563eea7b81',
    rut: '18.874.714',
    institution: 8
  },
  {
    id: 29,
    firstName: 'Morrison Colon',
    lastName: 'Parsons Hewitt',
    email: 'colonhewitt@imaginart.com',
    enrollment: '2c9e0040-8918-42c2-b1b9-9a3b5294a179',
    rut: '8.110.767',
    institution: 8
  },
  {
    id: 30,
    firstName: 'Latasha Yates',
    lastName: 'Yang Beasley',
    email: 'yatesbeasley@imaginart.com',
    enrollment: '07d05938-b866-4b86-b3c0-d10a2ab191f9',
    rut: '10.545.322',
    institution: 1
  },
  {
    id: 31,
    firstName: 'Fern Lisa',
    lastName: 'Pope Rowland',
    email: 'lisarowland@imaginart.com',
    enrollment: '947b3d2a-baf5-4e6a-8162-1783da8273f8',
    rut: '2.127.723',
    institution: 3
  },
  {
    id: 32,
    firstName: 'Arline Janna',
    lastName: 'Maddox Cardenas',
    email: 'jannacardenas@imaginart.com',
    enrollment: '4e9402f3-6ea8-4f76-9ea1-969af5733686',
    rut: '13.171.538',
    institution: 5
  },
  {
    id: 33,
    firstName: 'Adeline Mcbride',
    lastName: 'Sykes Allison',
    email: 'mcbrideallison@imaginart.com',
    enrollment: '982ee182-b454-44f8-a490-759613239b1e',
    rut: '8.666.458',
    institution: 1
  },
  {
    id: 34,
    firstName: 'Patty Mayer',
    lastName: 'Macias Stevenson',
    email: 'mayerstevenson@imaginart.com',
    enrollment: 'd7d88634-d545-4f48-a438-5b441d3a1658',
    rut: '10.821.112',
    institution: 10
  },
  {
    id: 35,
    firstName: 'Dianna Kirk',
    lastName: 'Simmons Wilkinson',
    email: 'kirkwilkinson@imaginart.com',
    enrollment: '7e78b782-d839-48ba-9180-27a8a0ceed48',
    rut: '8.460.807',
    institution: 6
  },
  {
    id: 36,
    firstName: 'Jody Julie',
    lastName: 'Shaw Humphrey',
    email: 'juliehumphrey@imaginart.com',
    enrollment: 'bb3bb204-19f3-4bea-b697-5022ba65658e',
    rut: '2.931.857',
    institution: 4
  },
  {
    id: 37,
    firstName: 'Sanders Hawkins',
    lastName: 'Valenzuela Wolf',
    email: 'hawkinswolf@imaginart.com',
    enrollment: 'd7803085-a6c7-4da5-bfe3-54d9dfc96f85',
    rut: '2.374.425',
    institution: 10
  },
  {
    id: 38,
    firstName: 'Isabel Valencia',
    lastName: 'Langley Terrell',
    email: 'valenciaterrell@imaginart.com',
    enrollment: '80eda40c-63cc-44a7-a183-70c2658a49fb',
    rut: '13.318.930',
    institution: 4
  },
  {
    id: 39,
    firstName: 'Puckett Shelia',
    lastName: 'Howell Barry',
    email: 'sheliabarry@imaginart.com',
    enrollment: '360df60a-8399-409d-b0d3-25e12815d088',
    rut: '19.566.412',
    institution: 10
  },
  {
    id: 40,
    firstName: 'Delores Sherman',
    lastName: 'Conway Russo',
    email: 'shermanrusso@imaginart.com',
    enrollment: '14b57470-4ca3-4fc0-9ac5-67815e77def3',
    rut: '16.247.696',
    institution: 6
  },
  {
    id: 41,
    firstName: 'Alvarez Beverley',
    lastName: 'Herman Mccormick',
    email: 'beverleymccormick@imaginart.com',
    enrollment: 'b99f9406-59ba-43ac-87cd-7de09648f446',
    rut: '15.712.283',
    institution: 3
  },
  {
    id: 42,
    firstName: 'Susie Lynnette',
    lastName: 'Cooke Petersen',
    email: 'lynnettepetersen@imaginart.com',
    enrollment: '46b43925-8eed-4e7a-8dce-3bd178cc3e4c',
    rut: '5.816.702',
    institution: 8
  },
  {
    id: 43,
    firstName: 'Morse Lambert',
    lastName: 'Ballard Dennis',
    email: 'lambertdennis@imaginart.com',
    enrollment: '00b0c044-5211-4d1f-ae3f-cd5ced812a0c',
    rut: '4.142.640',
    institution: 1
  },
  {
    id: 44,
    firstName: 'Michelle Santiago',
    lastName: 'Mccray Mcfadden',
    email: 'santiagomcfadden@imaginart.com',
    enrollment: 'ab3eb40e-5e8a-471f-b929-58ed1d03fcc0',
    rut: '2.413.220',
    institution: 6
  },
  {
    id: 45,
    firstName: 'Zelma Malone',
    lastName: 'Vaughn Haynes',
    email: 'malonehaynes@imaginart.com',
    enrollment: '5169ee28-a6bf-482f-9f23-c7221a0eb843',
    rut: '20.766.140',
    institution: 4
  },
  {
    id: 46,
    firstName: 'Ford Dolly',
    lastName: 'Morgan Reyes',
    email: 'dollyreyes@imaginart.com',
    enrollment: '42bcfe8f-2269-4c54-921e-b0c3b40f4dfc',
    rut: '8.946.975',
    institution: 7
  },
  {
    id: 47,
    firstName: 'Hopper Harper',
    lastName: 'Salazar Armstrong',
    email: 'harperarmstrong@imaginart.com',
    enrollment: '4bc6e35f-b5fa-404e-8d32-920b01daedb1',
    rut: '20.190.905',
    institution: 7
  },
  {
    id: 48,
    firstName: 'Gentry Haley',
    lastName: 'Walker Irwin',
    email: 'haleyirwin@imaginart.com',
    enrollment: '87a61591-1edc-4af1-89e0-9b8e14e0d47c',
    rut: '18.673.513',
    institution: 1
  },
  {
    id: 49,
    firstName: 'Reese Fanny',
    lastName: 'Pierce Bush',
    email: 'fannybush@imaginart.com',
    enrollment: 'aecc8bc0-f568-468c-a1f3-f091a245d609',
    rut: '20.413.723',
    institution: 1
  },
  {
    id: 50,
    firstName: 'Olivia Antonia',
    lastName: 'Dalton Carney',
    email: 'antoniacarney@imaginart.com',
    enrollment: '2537babc-ec26-4bce-8a86-d3c184c0a23d',
    rut: '6.651.718',
    institution: 3
  },
  {
    id: 51,
    firstName: 'Haney Tanner',
    lastName: 'Pollard Malone',
    email: 'tannermalone@imaginart.com',
    enrollment: '7d1d0647-1679-4a58-b2b8-221c359726ff',
    rut: '2.137.437',
    institution: 6
  },
  {
    id: 52,
    firstName: 'Claire House',
    lastName: 'Duncan Roy',
    email: 'houseroy@imaginart.com',
    enrollment: 'a6cb024d-fbec-47cc-adef-7c0a159e60aa',
    rut: '16.336.331',
    institution: 3
  },
  {
    id: 53,
    firstName: 'Woods Francine',
    lastName: 'Martinez Sheppard',
    email: 'francinesheppard@imaginart.com',
    enrollment: '26ccbf46-4e41-4580-a1d0-148ad1b6dc68',
    rut: '10.718.864',
    institution: 6
  },
  {
    id: 54,
    firstName: 'Valeria Torres',
    lastName: 'Rich Mooney',
    email: 'torresmooney@imaginart.com',
    enrollment: '29b2c284-a999-41c0-b41e-fe130ccd641a',
    rut: '17.681.714',
    institution: 8
  },
  {
    id: 55,
    firstName: 'Flowers Marilyn',
    lastName: 'Walters Gallagher',
    email: 'marilyngallagher@imaginart.com',
    enrollment: 'c0fb3d2e-c321-4f2a-9e46-cf2f1de5ec64',
    rut: '11.517.201',
    institution: 3
  },
  {
    id: 56,
    firstName: 'Buck Harmon',
    lastName: 'Morrison Patel',
    email: 'harmonpatel@imaginart.com',
    enrollment: 'dc8296ad-1d83-4c24-9d26-b11df18f5c7f',
    rut: '8.795.605',
    institution: 10
  },
  {
    id: 57,
    firstName: 'Virginia Gill',
    lastName: 'Serrano Coleman',
    email: 'gillcoleman@imaginart.com',
    enrollment: 'd2a03967-d808-4b9a-8e0e-d8cde4a9fa73',
    rut: '7.810.872',
    institution: 4
  },
  {
    id: 58,
    firstName: 'Hannah Pat',
    lastName: 'Kane Graves',
    email: 'patgraves@imaginart.com',
    enrollment: '922d9e3e-7571-41ec-a1a2-2d99bb98771b',
    rut: '6.130.378',
    institution: 10
  },
  {
    id: 59,
    firstName: 'Guzman Wood',
    lastName: 'Parks Bowen',
    email: 'woodbowen@imaginart.com',
    enrollment: '28a68f5f-3d81-42d8-8366-83680c8803b1',
    rut: '8.515.903',
    institution: 2
  },
  {
    id: 60,
    firstName: 'Jennie Price',
    lastName: 'Deleon Patrick',
    email: 'pricepatrick@imaginart.com',
    enrollment: '26272a2c-69e0-45c6-b1fc-a6d2a8f5c5cd',
    rut: '16.398.962',
    institution: 6
  },
  {
    id: 61,
    firstName: 'Staci Glover',
    lastName: 'Sosa Crawford',
    email: 'glovercrawford@imaginart.com',
    enrollment: 'bd3393b0-f51b-4e4f-9a4d-74e880aacde7',
    rut: '2.409.834',
    institution: 8
  },
  {
    id: 62,
    firstName: 'Jerri Watkins',
    lastName: 'Burgess Brewer',
    email: 'watkinsbrewer@imaginart.com',
    enrollment: 'ffd6d0e8-40b2-42d9-8408-d8f3e9447134',
    rut: '3.140.389',
    institution: 5
  },
  {
    id: 63,
    firstName: 'Hensley Lawson',
    lastName: 'Madden Robinson',
    email: 'lawsonrobinson@imaginart.com',
    enrollment: '22b64cfd-caed-4e8b-a0b6-1c824f4fc1cc',
    rut: '4.624.898',
    institution: 3
  },
  {
    id: 64,
    firstName: 'Lenora Whitaker',
    lastName: 'Sanders Haney',
    email: 'whitakerhaney@imaginart.com',
    enrollment: 'df0ba3e4-2c7b-4efe-9975-22a59265371c',
    rut: '16.939.269',
    institution: 9
  },
  {
    id: 65,
    firstName: 'Elisa Mullins',
    lastName: 'Lambert Greene',
    email: 'mullinsgreene@imaginart.com',
    enrollment: 'd42d8a8b-7699-4379-9336-07c579335a17',
    rut: '20.539.323',
    institution: 7
  },
  {
    id: 66,
    firstName: 'Sharpe Gwendolyn',
    lastName: 'Mcpherson Warner',
    email: 'gwendolynwarner@imaginart.com',
    enrollment: '07ef8eea-82c8-457b-8422-3613b191246b',
    rut: '6.820.602',
    institution: 6
  },
  {
    id: 67,
    firstName: 'Twila Morales',
    lastName: 'Joseph Compton',
    email: 'moralescompton@imaginart.com',
    enrollment: 'ef38201e-0bec-455c-9179-4612b66e2d2f',
    rut: '7.644.956',
    institution: 5
  },
  {
    id: 68,
    firstName: 'Dona Brittany',
    lastName: 'Beard Browning',
    email: 'brittanybrowning@imaginart.com',
    enrollment: '5cf3f3ff-e060-45ae-8bc6-3d3054527d69',
    rut: '11.134.399',
    institution: 9
  },
  {
    id: 69,
    firstName: 'Eva Alisa',
    lastName: 'Alston Walton',
    email: 'alisawalton@imaginart.com',
    enrollment: 'e04359ef-206e-4528-97ec-9746c8020186',
    rut: '13.818.762',
    institution: 8
  },
  {
    id: 70,
    firstName: 'Fannie Ernestine',
    lastName: 'Erickson Moreno',
    email: 'ernestinemoreno@imaginart.com',
    enrollment: 'a6883d4f-2364-4dbc-850f-262ac4e1b274',
    rut: '17.540.184',
    institution: 4
  },
  {
    id: 71,
    firstName: 'Walters Clark',
    lastName: 'Wynn Chen',
    email: 'clarkchen@imaginart.com',
    enrollment: '6b0b43b5-3f65-4ce0-be5d-ad6dcece7b3d',
    rut: '5.435.715',
    institution: 10
  },
  {
    id: 72,
    firstName: 'Odonnell Villarreal',
    lastName: 'Vaughan Levy',
    email: 'villarreallevy@imaginart.com',
    enrollment: '943210e0-b2a1-47b7-a8b7-ab22237cfdca',
    rut: '15.155.164',
    institution: 7
  },
  {
    id: 73,
    firstName: 'Delacruz Jones',
    lastName: 'Farmer Barnett',
    email: 'jonesbarnett@imaginart.com',
    enrollment: 'b20de3ee-5354-4636-858b-e626279daa3f',
    rut: '20.465.642',
    institution: 6
  },
  {
    id: 74,
    firstName: 'Georgette Claudette',
    lastName: 'Merritt Hardin',
    email: 'claudettehardin@imaginart.com',
    enrollment: '30fc5a05-9cc4-4789-9321-167269cca143',
    rut: '8.298.116',
    institution: 6
  },
  {
    id: 75,
    firstName: 'Cline Stacie',
    lastName: 'Macdonald Blackburn',
    email: 'stacieblackburn@imaginart.com',
    enrollment: '926aa273-4741-4edf-a1be-f41ccf21e51c',
    rut: '10.239.596',
    institution: 9
  },
  {
    id: 76,
    firstName: 'Rosella Leach',
    lastName: 'Lamb Roth',
    email: 'leachroth@imaginart.com',
    enrollment: 'bf828510-243b-4e82-8948-ccf1866b5bac',
    rut: '8.844.326',
    institution: 2
  },
  {
    id: 77,
    firstName: 'Branch Sellers',
    lastName: 'Burris Myers',
    email: 'sellersmyers@imaginart.com',
    enrollment: '2917a112-9fa4-48c4-ac98-4744589a75bb',
    rut: '20.369.213',
    institution: 7
  },
  {
    id: 78,
    firstName: 'Holman Herring',
    lastName: 'Watts Johns',
    email: 'herringjohns@imaginart.com',
    enrollment: '409765db-6418-44f3-b882-d034fb1db4ba',
    rut: '4.567.948',
    institution: 10
  },
  {
    id: 79,
    firstName: 'Hinton Snider',
    lastName: 'Sims Richards',
    email: 'sniderrichards@imaginart.com',
    enrollment: 'e791e0fb-ddce-499a-a667-42096e77cfd0',
    rut: '8.378.946',
    institution: 2
  },
  {
    id: 80,
    firstName: 'Boyle Salazar',
    lastName: 'Oconnor Lancaster',
    email: 'salazarlancaster@imaginart.com',
    enrollment: 'cef5e7a5-4172-4497-9d81-cf63bc0d970c',
    rut: '18.922.204',
    institution: 10
  },
  {
    id: 81,
    firstName: 'Alexandra Nola',
    lastName: 'Black Hutchinson',
    email: 'nolahutchinson@imaginart.com',
    enrollment: 'bd5a92ba-d697-4d98-8a8c-ceaccca16d6f',
    rut: '15.311.868',
    institution: 9
  },
  {
    id: 82,
    firstName: 'Ingram Rachel',
    lastName: 'Kramer Frank',
    email: 'rachelfrank@imaginart.com',
    enrollment: '3e71fd7b-d565-4426-8fe7-d85eecb20a67',
    rut: '19.708.683',
    institution: 4
  },
  {
    id: 83,
    firstName: 'Poole Nettie',
    lastName: 'Rasmussen Hale',
    email: 'nettiehale@imaginart.com',
    enrollment: '6500a230-6066-4e2d-a95a-e52e9ed9b406',
    rut: '16.489.766',
    institution: 5
  },
  {
    id: 84,
    firstName: 'Polly Eugenia',
    lastName: 'Waller Carlson',
    email: 'eugeniacarlson@imaginart.com',
    enrollment: '28ea66d8-40c7-4558-96bb-0ebafbc9f48b',
    rut: '6.344.790',
    institution: 5
  },
  {
    id: 85,
    firstName: 'Charlotte Alejandra',
    lastName: 'Koch Simpson',
    email: 'alejandrasimpson@imaginart.com',
    enrollment: '2102e5a4-636f-4f9d-a1f3-322a4041f037',
    rut: '15.241.574',
    institution: 1
  },
  {
    id: 86,
    firstName: 'Salas Julianne',
    lastName: 'Castaneda Williamson',
    email: 'juliannewilliamson@imaginart.com',
    enrollment: '44ac7c1f-580b-4f36-a228-3de93a1bf723',
    rut: '5.256.579',
    institution: 9
  },
  {
    id: 87,
    firstName: 'Gilmore Allie',
    lastName: 'Buckley Williams',
    email: 'alliewilliams@imaginart.com',
    enrollment: 'df4a562c-8bd5-4325-aafb-30c9b53542b6',
    rut: '14.539.971',
    institution: 1
  },
  {
    id: 88,
    firstName: 'Francisca Blanca',
    lastName: 'Howard Lucas',
    email: 'blancalucas@imaginart.com',
    enrollment: '4c27ec25-f7f2-4c30-b667-d0452a1f39b2',
    rut: '10.707.377',
    institution: 8
  },
  {
    id: 89,
    firstName: 'Caitlin Kim',
    lastName: 'Lee Blackwell',
    email: 'kimblackwell@imaginart.com',
    enrollment: '132f18a9-1cfe-4ac9-b00e-2eee2d252016',
    rut: '9.645.915',
    institution: 1
  },
  {
    id: 90,
    firstName: 'Briana Kennedy',
    lastName: 'Nelson Mueller',
    email: 'kennedymueller@imaginart.com',
    enrollment: 'd0e39bd2-97f7-4286-96d2-0a9c0bc6efde',
    rut: '11.251.322',
    institution: 3
  },
  {
    id: 91,
    firstName: 'Silva Rosa',
    lastName: 'Pate Huff',
    email: 'rosahuff@imaginart.com',
    enrollment: '71986c4b-d0b9-4674-8ed1-e10ba755cb7b',
    rut: '18.265.949',
    institution: 1
  },
  {
    id: 92,
    firstName: 'Gardner Bernice',
    lastName: 'Miller Mack',
    email: 'bernicemack@imaginart.com',
    enrollment: '976c1eea-8395-4bf7-bcfb-47eb30bcc198',
    rut: '16.280.315',
    institution: 9
  },
  {
    id: 93,
    firstName: 'Howell Livingston',
    lastName: 'Espinoza Cannon',
    email: 'livingstoncannon@imaginart.com',
    enrollment: '481c58db-2e63-4cd0-99bd-26b87bf1e13e',
    rut: '8.610.833',
    institution: 8
  },
  {
    id: 94,
    firstName: 'Keith Greer',
    lastName: 'Hopper David',
    email: 'greerdavid@imaginart.com',
    enrollment: 'a37f8bd6-f0df-47e4-be04-526d4ae4e7d2',
    rut: '1.812.620',
    institution: 3
  },
  {
    id: 95,
    firstName: 'Sylvia Lewis',
    lastName: 'Marquez Finch',
    email: 'lewisfinch@imaginart.com',
    enrollment: 'a5c1b027-2f74-46e0-9c0e-18f8e5b66ed3',
    rut: '3.691.111',
    institution: 9
  },
  {
    id: 96,
    firstName: 'Nadine Sullivan',
    lastName: 'Mcmahon Hansen',
    email: 'sullivanhansen@imaginart.com',
    enrollment: '473e5891-4c36-4234-aeb9-3d48ea19a703',
    rut: '13.282.766',
    institution: 3
  },
  {
    id: 97,
    firstName: 'Ella Burt',
    lastName: 'Harding Summers',
    email: 'burtsummers@imaginart.com',
    enrollment: '106275c5-05ea-4727-b3cb-a8421510529d',
    rut: '8.215.718',
    institution: 4
  },
  {
    id: 98,
    firstName: 'Serena Kaitlin',
    lastName: 'Pruitt Campos',
    email: 'kaitlincampos@imaginart.com',
    enrollment: 'ef4a8fca-fcb3-42cc-85da-0388306b26a8',
    rut: '1.867.863',
    institution: 5
  },
  {
    id: 99,
    firstName: 'Lowery Farrell',
    lastName: 'Greer Delgado',
    email: 'farrelldelgado@imaginart.com',
    enrollment: '26907acb-7f44-4611-9d5e-ca60ef380338',
    rut: '5.890.639',
    institution: 5
  },
  {
    id: 100,
    firstName: 'Teri Mccarthy',
    lastName: 'Lane Casey',
    email: 'mccarthycasey@imaginart.com',
    enrollment: 'b81eb3a9-7146-4b60-b1a3-b0992b68b392',
    rut: '15.657.870',
    institution: 7
  }
];

export default (state = INITIAL_STATE, action) => {
  const { attendee, attendees } = action;
  const stateItem =
    typeof attendee === 'undefined'
      ? false
      : state.find(singleStateItem => singleStateItem.id === attendee.id);
  switch (action.type) {
    case ATTENDEES_ADD:
      attendee.id = state.length + 1;
      state.push(attendee);
      return state;
    case ATTENDEES_DELETE:
      // TODO Eliminarlos de los grupos
      return state.filter(attendeeS => attendees.indexOf(attendeeS.id) === -1);
    case ATTENDEES_EDIT:
      Object.keys(attendee).forEach(propName => {
        stateItem[propName] = attendee[propName];
      });
      return state;
    case ATTENDEES_ADD_FROM_XLXS:
      return state.concat(attendees);
    default:
      return state;
  }
};
