model User {
    id              Int             @id @default(autoincrement())
    role            Role[]          @defalt(CLIENT)
    firstname       String
    lastname        String
    email           String          @unique
    phone           String          @unique
    zipcode         String?
    country         String?
    address         String?
    company         String?
    quotations      Quotation[]
    projects        Project[]
    createdAt       DateTime        @default(now())
}

model Invoice {
    id                          Int             @id @default(autoincrement())
    user_id                     Int
    initial_budget              Int
    tva                         Int             @default(20)
    price_without_taxes         Int
    total_price                 Int
    description                 String
    details                     String[]
    billing_address             String
    offer                       Offers
    plateform                   Plateforms
    payment                     Payment
    specificities               Specs[]
    term                        DateTime
    time_spent                  DateTime
    createdAt                   DateTime        @default(now())
}

model Project {
    id                          Int             @id @default(autoincrement())
    quotation_id                Int
    quotation                   Quotation?      @relation(fields: [quotation_id], references: [id])
    progress                    Int             @default(0)
    status                      Status          @default(ACCEPTED)
    technologies                Techs[]
    preview                     String          @default(null)
    developers                  Team[]
    estimated_time              DateTime
    updatedAt                   DateTime        @updatedAt
    startedAt                   DateTime        @default(now())
    finishedAt                  DateTime
}

model Payment {
    id              Int             @id @default(autoincrement())
    invoice_id      Int
    status          Status
    payment_method  PaymentsMethod
    amount          Int
    createdAt       DateTime        @default(now())
}

model Articles {
    id              Int             @id @default(autoincrement())
    author          User            @relation(fields: [authorId], references: [id])
    authorId        Int
    title           String
    description     String
    updatedAt       DateTime        @updatedAt
    createdAt       DateTime        @default(now())
}

model Quotation {
    id              Int             @id @default(autoincrement())
    user_id         Int
    status          Status          @default(PENDING)
    description     String
    images          String[]
    plateform       Plateforms
    budget          Int
    specificities   Specs[]
    offer           Offers
    term            DateTime
    createdAt       DateTime        @default(now())
}

enum Role {
    CLIENT
    FRONTEND_DEVELOPER
    BACKEND_DEVELOPER
    ADMIN
}

enum Offers {
    BASIC
    BUSINESS
}

enum Plateforms {
    WEBSITE
    MOBILE_APPLICATION
}

enum Specs {
    RESPONSIVE
    INTEGRATION
    TRANSLATION
    DESIGN
    IOS
    ANDROID
    FIREFOX
    CHROME
    OPERA
    IE
    PRODUCTION
    MIGRATION
    HOSTING
}

enum PaymentsMethod {
    CREDIT_CARD
    BANK_TRANSFER
}

enum Status {
    ACCEPTED
    DONE
    PENDING
    REJECT
}

enum Techs {
    REACT_NATIVE
    REACT_JS
    JS_NATIVE
    PHP
    HTML
    CSS
    SASS
    SCSS
    MYSQL
    DOCKER
    POSTGRESQL
    MONGODB
    AWS
}

enum Team {
    FCIPRIAN
    CALBA
}