import contact from './entities/contact/contact';

export default {
    connectionString: 'postgres://postgres:52Ag98d5@localhost:5433/CRM',
    data: {
        pageSize: 10
    },
    entities: [
        contact
    ]
};