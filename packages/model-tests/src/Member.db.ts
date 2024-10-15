import { DefaultMember } from '@comradesharf/model-mocks/Member';
import { MemberModel } from '@comradesharf/models/models/MemberModel';
import { connection } from 'mongoose';
import { expect, test } from 'vitest';

test('should be able to create', async () => {
    await connection.transaction(async (session) => {
        const [mbr] = await MemberModel.create([DefaultMember], { session });
        await expect(
            MemberModel.findById(mbr._id).session(session).lean().orFail(),
        ).resolves.not.toThrow();
    });
});
