#!/usr/bin/python
import argparse
import csv
import random

REGIONS = [
    'East Midlands',
    'Eastern',  # East of England
    'London',
    'North East',
    'North West',
    'Northern Ireland',  #
    'Scotland',  #
    'South East',
    'South West',
    'Wales',  #
    'West Midlands',
    'Yorkshire and The Humber'
]

MARKETS = ['Andorra', 'Afghanistan', 'Antigua and Barbuda', 'Albania', 'Armenia', 'Angola', 'Argentina', 'Austria', 'Australia', 'Azerbaijan', 'Barbados', 'Bangladesh', 'Belgium', 'Burkina Faso', 'Bulgaria', 'Bahrain', 'Burundi', 'Benin', 'Brunei Darussalam', 'Bolivia', 'Brazil', 'Bahamas', 'Bhutan', 'Botswana', 'Belarus', 'Belize', 'Canada', 'Democratic Republic of the Congo', 'Republic of the Congo', "C\xc3\xb4te d'Ivoire", 'Chile', 'Cameroon', "People's Republic of China", 'Colombia', 'Costa Rica', 'Cuba', 'Cape Verde', 'Cyprus', 'Czech Republic', 'Germany', 'Djibouti', 'Denmark', 'Dominica', 'Dominican Republic', 'Ecuador', 'Estonia', 'Egypt', 'Eritrea', 'Ethiopia', 'Finland', 'Fiji', 'France', 'Gabon', 'Georgia', 'Ghana', 'The Gambia', 'Guinea', 'Greece', 'Guatemala', 'Haiti', 'Guinea-Bissau', 'Guyana', 'Honduras', 'Hungary', 'Indonesia', 'Republic of Ireland', 'Israel', 'India', 'Iraq', 'Iran', 'Iceland', 'Italy', 'Jamaica', 'Jordan', 'Japan', 'Kenya', 'Kyrgyzstan', 'Kiribati', 'North Korea', 'South Korea', 'Kuwait', 'Lebanon', 'Liechtenstein', 'Liberia', 'Lesotho', 'Lithuania', 'Luxembourg', 'Latvia', 'Libya', 'Madagascar', 'Marshall Islands', 'Macedonia', 'Mali', 'Myanmar', 'Mongolia', 'Mauritania', 'Malta', 'Mauritius', 'Maldives', 'Malawi', 'Mexico', 'Malaysia', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Nicaragua', 'Kingdom of the Netherlands', 'Norway', 'Nepal', 'Nauru', 'New Zealand', 'Oman', 'Panama', 'Peru', 'Papua New Guinea', 'Philippines', 'Pakistan', 'Poland', 'Portugal', 'Palau', 'Paraguay', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saudi Arabia', 'Solomon Islands', 'Seychelles', 'Sudan', 'Sweden', 'Singapore', 'Slovenia', 'Slovakia', 'Sierra Leone', 'San Marino', 'Senegal', 'Somalia', 'Suriname', 'S\xc3\xa3o Tom\xc3\xa9 and Pr\xc3\xadncipe', 'Syria', 'Togo', 'Thailand', 'Tajikistan', 'Turkmenistan', 'Tunisia', 'Tonga', 'Turkey', 'Trinidad and Tobago', 'Tuvalu', 'Tanzania', 'Ukraine', 'Uganda', 'United States', 'Uruguay', 'Uzbekistan', 'Vatican City', 'Venezuela', 'Vietnam', 'Vanuatu', 'Yemen', 'Zambia', 'Zimbabwe', 'Algeria', 'Bosnia and Herzegovina', 'Cambodia', 'Central African Republic', 'Chad', 'Comoros', 'Croatia', 'East Timor', 'El Salvador', 'Equatorial Guinea', 'Grenada', 'Kazakhstan', 'Laos', 'Federated States of Micronesia', 'Moldova', 'Monaco', 'Montenegro', 'Morocco', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'Serbia', 'South Africa', 'Spain', 'Sri Lanka', 'Swaziland', 'Switzerland', 'United Arab Emirates',]

GENERAL_SECTORS = ['Advanced Engineering', 'Metals, Minerals and Materials', 'Food and Drink', 'Global Sports Projects', 'Biotechnology and Pharmaceuticals', 'Defence', 'Leisure and Tourism', 'Environment', 'Financial Services (including Professional Services)', 'Mining', 'Power', 'Automotive', 'Oil and Gas', 'Railways', 'Water', 'Chemicals', 'Construction', 'Textiles, Interior Textiles and Carpets', 'Aerospace', 'Metallurgical Process Plant', 'Marine', 'Clothing, Footwear and Fashion', 'Household Goods, Furniture and Furnishings', 'Airports', 'Renewable Energy', 'Creative and Media', 'Business (and Consumer) Services', 'Education and Training', 'Communications', 'Electronics and IT Hardware', 'Defence and Security', 'Security', 'Retail', 'Software and Computer Services Business to Business (B2B)', 'Healthcare and Medical', 'ICT', 'Mechanical Electrical and Process Engineering', 'Life Sciences', 'Giftware, Jewellery and Tableware', 'Agriculture, Horticulture and Fisheries', 'Mass Transport', 'Energy', 'Ports and Logistics', 'Environment and Water']

SPECIFIC_SECTORS = ['Aerospace : Maintenance', 'Financial Services (including Professional Services) : Listings', 'Creative and Media : Media : TV and Radio', 'Creative and Media', 'Biotechnology and Pharmaceuticals : Bio and Pharma Marketing and Sales', 'Aerospace : Manufacturing and Assembly', 'Leisure and Tourism : Sports and Leisure Infrastructure', 'Biotechnology and Pharmaceuticals : Lab Services', 'Financial Services (including Professional Services) : Capital Markets : Venture Capital', 'Creative and Media : Media Reproduction : Printing', 'Healthcare and Medical : Medical Consumables', 'Chemicals', 'Food and Drink : Pet Food', 'Automotive : Automotive Retail', 'Marine', 'Clothing, Footwear and Fashion', 'Renewable Energy : Solar', 'Financial Services (including Professional Services) : Professional Services : Accountancy Services', 'Communications : Retail', 'Electronics and IT Hardware', 'Environment : Marine Pollution Control', 'Healthcare and Medical : Healthcare Services : Public Sector', 'Automotive : Manufacturing and Assembly : Motorcycles', 'Creative and Media : Media', 'Renewable Energy : Wind', 'Agriculture, Horticulture and Fisheries', 'Creative and Media : Creative and Media Retail : Books, Newspapers and Stationery', 'Creative and Media : Creative and Media Equipment', 'Food and Drink : Brewing', 'Software and Computer Services Business to Business (B2B) : Online Retailing', 'Financial Services (including Professional Services) : Insurance : Life Insurance', 'Environment : Waste Management', 'Food and Drink', 'Financial Services (including Professional Services) : Insurance', 'Automotive : Manufacturing and Assembly : Bicycles', 'Software and Computer Services Business to Business (B2B) : Financial Applications', 'Metals, Minerals and Materials', 'Business (and Consumer) Services : Marketing Services : Market Research', 'Metals, Minerals and Materials : Composite Materials', 'Leisure and Tourism : Gaming', 'Healthcare and Medical : Healthcare Marketing and Sales', 'Financial Services (including Professional Services) : Professional Services', 'Environment : Water Management', 'Railways', 'Environment : Fuel Cells', 'Financial Services (including Professional Services) : Foreign Exchange', 'Water', 'Construction', 'Financial Services (including Professional Services) : Professional Services : Legal Services', 'Power : Nuclear', 'Electronics and IT Hardware : Electronics and IT Technologies : Network Technologies', 'Airports', 'Food and Drink : Ready Meals', 'Creative and Media : Media Reproduction', 'Healthcare and Medical : Healthcare Services', 'Automotive : Component Manufacturing', 'Creative and Media : Architecture', 'Software and Computer Services Business to Business (B2B)', 'Energy', 'Software and Computer Services Business to Business (B2B) : Security Related Software', 'Creative and Media : Creative and Media Distribution : Film and Video', 'Healthcare and Medical : Healthcare Services : Private Sector', 'Chemicals : Paint, Coating and Adhesive Products', 'Creative and Media : Creative and Media Wholesaling : Musical Instruments', 'Creative and Media : Art, Design and Creativity : Artistic and Literary Creation', 'Environment and Water', 'Creative and Media : Creative and Media Retail : Art', 'Clothing, Footwear and Fashion : Footwear', 'Healthcare and Medical : Healthcare Services : Nursing Homes', 'Food and Drink : Food and Drink Manufacturing', 'Metals, Minerals and Materials : Minerals', 'Environment', 'Communications : Wireless', 'Defence', 'Security', 'Business (and Consumer) Services : HR Services', 'Healthcare and Medical : Healthcare Marketing and Sales : Healthcare Retail', 'Food and Drink : Dairy Products', 'Aerospace : Manufacturing and Assembly : UAVs', 'Textiles, Interior Textiles and Carpets', 'Aerospace', 'Healthcare and Medical : Medical Equipment : Spectacles and Unmounted Lenses', 'Communications : Mobile', 'Household Goods, Furniture and Furnishings', 'Healthcare and Medical : Healthcare Services : Medical Practice', 'Clothing, Footwear and Fashion : Clothing', 'Creative and Media : Creative and Media Distribution', 'Renewable Energy', 'Business (and Consumer) Services', 'Education and Training', 'Creative and Media : Art, Design and Creativity : Fashion', 'Food and Drink : Meat Products', 'Financial Services (including Professional Services) : Professional Services : Management Consultancy', 'Chemicals : Cleaning Preparations', 'Biotechnology and Pharmaceuticals : Pharmaceuticals', 'Defence and Security', 'Financial Services (including Professional Services) : Banking : Investment Banking', 'Retail', 'Healthcare and Medical', 'Healthcare and Medical : Medical Devices and Systems : Optical Precision Instruments', 'Giftware, Jewellery and Tableware', 'Software and Computer Services Business to Business (B2B) : Biometrics', 'Aerospace : Manufacturing and Assembly : Space Technology', 'Creative and Media : Art, Design and Creativity : Design', 'Healthcare and Medical : Healthcare Services : Vets', 'Creative and Media : Media : Video Games', 'Ports and Logistics', 'Financial Services (including Professional Services) : Banking', 'Advanced Engineering', 'Oil and Gas', 'Global Sports Projects', 'Biotechnology and Pharmaceuticals', 'Leisure and Tourism', 'Automotive : Manufacturing and Assembly : Caravans', 'Automotive : Automotive Maintenance', 'Financial Services (including Professional Services)', 'Mining', 'Creative and Media : Media : Music', 'Power', 'Healthcare and Medical : Medical Devices and Systems', 'Creative and Media : Art, Design and Creativity', 'Food and Drink : Beverages and Alcoholic Drinks', 'Global Sports Projects : Major Events', 'Metallurgical Process Plant', 'Chemicals : Miscellaneous Chemicals', 'Food and Drink : Fruit and Vegetables', 'Creative and Media : Creative and Media Retail', 'Financial Services (including Professional Services) : Capital Markets', 'Communications', 'Creative and Media : Media : Publishing', 'Creative and Media : Events and Attractions', 'ICT', 'Mechanical Electrical and Process Engineering', 'Life Sciences', 'Business (and Consumer) Services : Marketing Services', 'Renewable Energy : Wind : Renewable energy: Wind: Offshore', 'Mass Transport', 'Healthcare and Medical : Medical Equipment', 'Environment : Environmental Monitoring', 'Financial Services (including Professional Services) : Asset Management', 'Creative and Media : Media : Film, Photography and Animation', 'Automotive', 'Clothing, Footwear and Fashion : Clothing : Workwear']

UKTI_RESULTS = [
    'The value would have been more than 80% of what was achieved',
    'Yes, but not as quickly',
    'Probably not',
    'Some, but not all',
    'The value would have been 60%-80% of what was achieved',
    'The value would have been 40%-60% of what was achieved',
    'value would have been 20%-40% of what was achieved',
    'Yes, the value of results would have been similar',
    'Definitely not',
    'The value would have been less than 20% of what was achieved'
]

TYPES_OF_SUPPORT = [
    'Political and economic briefing',
    'Non-export : Other - FCO',
    'Non-export : Reduced tax burdens - FCO',
    'Non-export : Outward Direct Investment - FCO',
    'Market entry advice and support - UKTI/FCO in UK',
    'Lobbying to overcome a problem - UKTI/FCO',
    'Missions, tradeshows and events (UKTI/FCO)',
    'Non-export : New Business in UK/3rd market - FCO',
    'Advice, access and contacts - UKTI/FCO Overseas',
    'Building positive reputation - UKTI/FCO'
]

HEADERS = ['UKRegion', 'Market', 'GeneralSector', 'SpecificSector', 'UKTIResults', 'TypeOfSupport']


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('num_records', metavar='num_records', type=int,
                       help='an integer for the accumulator')

    args = parser.parse_args()

    with open('./app/data/business-wins-TEST.csv', 'wb') as f:
        wr = csv.writer(f, quoting=csv.QUOTE_ALL)
        wr.writerow(HEADERS)
        for i in range(args.num_records):
            wr.writerow([
                random.choice(REGIONS),
                random.choice(MARKETS),
                random.choice(GENERAL_SECTORS),
                random.choice(SPECIFIC_SECTORS),
                random.choice(UKTI_RESULTS),
                random.choice(TYPES_OF_SUPPORT),
            ])
