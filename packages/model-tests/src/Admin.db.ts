import { DefaultAdmin } from '@comradesharf/model-mocks/Admin';
import { AdminModel } from '@comradesharf/models/models/AdminModel';
import { connection } from 'mongoose';
import { expect, test } from 'vitest';

test('should be able to create', async () => {
    await connection.transaction(async (session) => {
        const [adm] = await AdminModel.create([DefaultAdmin], { session });
        await expect(
            AdminModel.findById(adm._id).session(session).lean().orFail(),
        ).resolves.not.toThrow();
    });
});
