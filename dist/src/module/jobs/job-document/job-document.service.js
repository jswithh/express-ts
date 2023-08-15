import { db } from '../../../db/database';
import { jobs_Document } from '../../../db/schema';
import { eq } from 'drizzle-orm';
export class Jobs_DocumentService {
    async getAll(page, limit) {
        if (page <= 0 || limit <= 0) {
            throw new Error('Invalid page or limit value');
        }
        try {
            const offset = (page - 1) * limit;
            const pageJobDocument = await db
                .select({
                id: jobs_Document.id,
                name: jobs_Document.name,
                email: jobs_Document.email,
                document: jobs_Document.document,
                date: jobs_Document.createdAt,
            })
                .from(jobs_Document)
                .limit(limit)
                .offset(offset);
            if (pageJobDocument.length === 0) {
                return 'Job Document not found';
            }
            return pageJobDocument;
        }
        catch (error) {
            console.error('Error in jobs_Documentervice.getAll:', error);
            throw new Error('Failed to get JobDocument');
        }
    }
    async create(jobId, CreatejobDocumentDto) {
        try {
            const newJobDocument = {
                ...CreatejobDocumentDto,
                jobId,
            };
            const [createdJobDocumentId] = await db
                .insert(jobs_Document)
                .values(newJobDocument);
            return 'JobDocument created successfully!';
        }
        catch (error) {
            console.error('Error in jobs_Documentervice.create:', error);
            throw new Error('Failed to create JobDocument');
        }
    }
    async delete(jobId) {
        try {
            await db.delete(jobs_Document).where(eq(jobs_Document.id, jobId));
            return 'JobDocument deleted successfully!';
        }
        catch (error) {
            console.error('Error in jobs_Documentervice.delete:', error);
            throw new Error('Failed to delete JobDocument');
        }
    }
}
//# sourceMappingURL=job-document.service.js.map