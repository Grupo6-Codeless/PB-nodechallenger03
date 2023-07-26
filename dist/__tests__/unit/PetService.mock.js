"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PetServiceMock {
    PetUpdateRepositoryMockRequestCorrect() {
        return {
            name: 'Akamaru',
            species: 'dog',
            carry: 'p',
            weight: 10,
            date_of_birth: '1993-12-12 10:10',
        };
    }
}
exports.default = new PetServiceMock();
